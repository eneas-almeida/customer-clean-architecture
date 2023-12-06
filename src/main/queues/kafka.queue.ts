import { Kafka, Producer } from 'kafkajs';
import { CustomersUseCaseInterface } from '@/application/contracts';

export class KafkaQueue {
    private producer: Producer;

    constructor(private readonly customersUseCase: CustomersUseCaseInterface) {}

    async setup() {
        const kafka = new Kafka({
            clientId: 'customer-clean-architecture',
            brokers: ['127.0.0.1:19092', '127.0.0.1:29092', '127.0.0.1:39092'],
            retry: {
                initialRetryTime: 300,
                retries: 10,
            },
        });

        const producer = kafka.producer();
        const consumer = kafka.consumer({ groupId: 'consumerApi' });

        await producer
            .connect()
            .then(() => console.log('Producer connected'))
            .catch((e) => console.log(`Can't connect ${e.message}`));

        await consumer
            .connect()
            .then(() => console.log('Consumer connected'))
            .then(() => consumer.subscribe({ topic: 'meutopico', fromBeginning: true }))
            .then(() => consumer.run({ eachMessage: ({ topic, message }) => this.handle(topic, message) }))
            .catch((e) => console.log(`Can't connect ${e.message}`));

        this.producer = producer;
    }

    send(topic: string, { key, value }: any): void {
        this.producer.send({
            topic,
            messages: [{ key, value: JSON.stringify(value) }],
        });
    }

    async handle(topic: string, message: any): Promise<void> {
        console.log(topic, message.value);
    }
}
