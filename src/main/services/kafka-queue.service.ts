import { Consumer, Kafka, Producer } from 'kafkajs';
import { QueueServiceInterface } from '../contracts/queue';

export class KafkaQueueService implements QueueServiceInterface {
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    private callback: Function;

    init() {
        this.kafka = new Kafka({
            clientId: 'customer-clean-architecture',
            brokers: ['127.0.0.1:19092', '127.0.0.1:29092', '127.0.0.1:39092'],
            retry: {
                initialRetryTime: 300,
                retries: 10,
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

    async setTopic(topic: string, fromBeginning: boolean = true) {
        await this.consumer
            .subscribe({ topic, fromBeginning })
            .then(() => console.log(`Consumer subscribed to ${topic}`))
            .catch((e) => {
                throw e;
            });

        this.consumer
            .run({
                eachMessage: async ({ message }) => {
                    const data = JSON.parse(message.value.toString());

                    this.callback(data)
                        .then(() => console.log('Consumer message processed'))
                        .catch((e: Error) => {
                            console.log(e.message);
                        });
                },
            })
            .then(() => console.log('Consumer running'))
            .catch((e) => {
                throw e;
            });

        return this;
    }

    onMessage(topic: string, callback: any, data: any): void {
        this.callback = callback;

        this.producer.send({
            topic,
            messages: [{ key: 'fixed', value: JSON.stringify(data) }],
        });
    }
}
