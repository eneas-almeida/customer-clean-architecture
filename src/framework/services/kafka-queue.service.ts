import { Consumer, Kafka, Producer } from 'kafkajs';
import { QueueHandlerInterface, QueueServiceInterface } from './contracts';

export class KafkaQueueService implements QueueServiceInterface {
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    private handlers: QueueHandlerInterface[];

    init() {
        this.kafka = new Kafka({
            logLevel: 1,
            clientId: 'customer-clean-architecture',
            brokers: ['127.0.0.1:19092', '127.0.0.1:29092', '127.0.0.1:39092'],
            retry: {
                initialRetryTime: 300,
                retries: 10,
            },
        });

        this.handlers = [];

        return this;
    }

    async setProducer() {
        this.producer = this.kafka.producer();

        await this.producer
            .connect()
            .then(() => console.log('Producer connected'))
            .catch((e) => {
                throw e;
            });

        return this;
    }

    async setConsumer(groupId: string) {
        this.consumer = this.kafka.consumer({ groupId });

        await this.consumer
            .connect()
            .then(() => console.log('Consumer connected'))
            .catch((e) => {
                throw e;
            });

        return this;
    }

    async setTopic(topic: string, fromBeginning: boolean, callback: Function) {
        await this.consumer
            .subscribe({ topic, fromBeginning })
            .then(() => {
                this.handlers.push({ topic, callback });
                console.log(`Consumer subscribed to ${topic}`);
            })
            .catch((e) => {
                throw e;
            });

        await this.consumer
            .run({
                eachMessage: async ({ topic, message }) => {
                    if (!topic || !message || !message.value) return;

                    const existsHandler = this.handlers.find((item) => item.topic === topic);

                    if (!existsHandler) return;

                    try {
                        const data = JSON.parse(message.value.toString());
                        await existsHandler.callback(data);
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

        return this;
    }

    emit(topic: string, key: string, data: any): void {
        data.createdAt = new Date();

        const payload: any = {
            topic,
            acks: -1,
            messages: [],
        };

        const message: any = {
            value: JSON.stringify(data),
        };

        if (key) message['key'] = key;

        payload.messages.push(message);

        this.producer.send(payload);
    }
}
