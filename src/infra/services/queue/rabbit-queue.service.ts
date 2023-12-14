/**
 * @author Enéas Almeida <eneas.eng@yahoo.com>
 * @description A classe é responsável por criar um serviços de filas utilizando o RabbitMQ.
 */

import amqp from 'amqplib';
import { QueueHandler, QueueServiceInterface } from './contracts';

export class RabbitQueueService implements QueueServiceInterface {
    private connection: amqp.Connection;
    private channel: amqp.Channel;
    private handlers: QueueHandler[];

    constructor() {
        this.handlers = [];
    }

    async setHandlers(handlers?: QueueHandler[]) {
        if (!handlers) return this;
        this.handlers.push(...handlers);
    }

    async setProducer() {
        this.connection = await amqp.connect('amqp://localhost');
    }

    async setChannel() {
        this.channel = await this.connection.createChannel();
    }

    async setQueue(queue: string) {
        await this.channel.assertQueue(queue, { durable: false });
    }

    async setConsumer(queue: string) {
        process.once('SIGINT', async () => {
            await this.channel.close();
            await this.connection.close();
        });

        await this.channel.assertQueue(queue, { durable: false });

        await this.channel.consume(
            queue,
            (message) => {
                if (message) {
                    console.log(" [x] Received '%s'", JSON.parse(message.content.toString()));
                }
            },
            { noAck: true }
        );
    }

    emit(queue: string, handler: string, content: any): void {
        if (!this.handlers.length) throw new Error('No handlers defined');

        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(content)));
    }
}
