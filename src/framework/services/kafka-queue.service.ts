/**
 * @author Enéas Almeida <eneas.eng@yahoo.com>
 * @description A classe é responsável por criar um serviços de filas utilizando o Kafka.
 */

import { Consumer, Kafka, Producer } from 'kafkajs';
import { QueueHandler, QueueServiceInterface } from './contracts';

export class KafkaQueueService implements QueueServiceInterface {
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    private handlers: QueueHandler[];

    constructor() {
        this.init();
    }

    init() {
        this.kafka = new Kafka({
            logLevel: 1,
            clientId: 'customer-clean-architecture',
            brokers: ['127.0.0.1:19092', '127.0.0.1:29092', '127.0.0.1:39092'],
            retry: {
                initialRetryTime: 300,
                retries: 3,
            },
        });

        this.handlers = [];
    }

    async setHandlers(handlers?: QueueHandler[]) {
        if (!handlers) return this;
        this.handlers.push(...handlers);
    }

    async setProducer() {
        this.producer = this.kafka.producer();

        await this.producer
            .connect()
            .then(() => console.log('Producer connected'))
            .catch((e) => {
                throw e;
            });
    }

    async setConsumer(topic: string, fromBeginning: boolean, groupId: string) {
        this.consumer = this.kafka.consumer({
            groupId,
        });

        await this.consumer
            .connect()
            .then(() => console.log('Consumer connected'))
            .catch((e) => {
                throw e;
            });

        await this.consumer
            .subscribe({ topic, fromBeginning })
            .then(() => {
                console.log(`Consumer subscribed to ${topic}`);
            })
            .catch((e) => {
                throw e;
            });

        await this.consumer
            .run({
                eachMessage: async ({ topic, message }) => {
                    if (!topic || !message || !message.value || !message.headers) return;

                    const { keyHandler } = message.headers;

                    if (!keyHandler) return;

                    const handler = this.handlers.find((item) => item.key === keyHandler.toString());

                    if (!handler) return;

                    try {
                        const messageValue = JSON.parse(message.value.toString());

                        await handler.fn(messageValue);

                        console.log(`Consumer received and processed message from ${topic}`);
                    } catch (e) {
                        console.error(e.message);
                    }
                },
            })
            .then(() => console.log('Consumer running'))
            .catch((e) => {
                throw e;
            });
    }

    emit(topic: string, key: string, keyHandler: string, data: any): void {
        if (!this.handlers.length) throw new Error('No handlers defined');

        data.createdAt = new Date();

        const payload: any = {
            topic,
            acks: -1, // default is -1
            messages: [
                {
                    value: JSON.stringify(data),
                    key,
                    headers: {
                        keyHandler,
                    },
                },
            ],
        };

        this.producer.send(payload);
    }
}
