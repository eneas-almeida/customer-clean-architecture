import { Consumer, Kafka, Producer } from 'kafkajs';
import { QueueHandlerInterface, QueueServiceInterface } from './contracts';

export class KafkaQueueService implements QueueServiceInterface {
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    private handlers: QueueHandlerInterface;

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

    async setTopic(topic: string, fromBeginning: boolean, handlers: QueueHandlerInterface) {
        await this.consumer
            .subscribe({ topic, fromBeginning })
            .then(() => {
                this.handlers = handlers;
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

                    const fnHandle = this.handlers[keyHandler.toString()];

                    if (!fnHandle) return;

                    try {
                        const dataMessage = JSON.parse(message.value.toString());
                        await fnHandle(dataMessage);
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

    emit(topic: string, key: string, keyHandler: string, data: any): void {
        data.createdAt = new Date();

        const payload: any = {
            topic,
            acks: -1, // -1 is default
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
