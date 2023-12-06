import { Consumer, Kafka, Producer } from 'kafkajs';
import { QueueServiceInterface } from '../contracts/queue';
import { CustomersUseCaseInterface } from '@/application/contracts';

export class KafkaQueueService implements QueueServiceInterface {
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;

    constructor(private readonly customersUseCase: CustomersUseCaseInterface) {}

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

        await this.consumer
            .run({
                eachMessage: async ({ topic, message }) => {
                    const data = JSON.parse(message.value.toString());
                    await this.handle(topic, data);
                },
            })
            .then(() => console.log('Consumer running'))
            .catch((e) => {
                throw e;
            });

        return this;
    }

    emit(topic: string, data: any): void {
        this.producer.send({
            topic,
            messages: [{ key: 'fixed', value: JSON.stringify(data) }],
        });
    }

    async handle(topic: string, data: any) {
        try {
            const map: any = {
                meutopico: async () => await this.customersUseCase.create(data),
            };

            await map[topic]();

            console.log(`Customer created: ${JSON.stringify(data)}`);
        } catch (e) {
            console.log(e.message);
        }
    }
}
