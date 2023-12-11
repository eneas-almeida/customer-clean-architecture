import { QueueServiceInterface } from '@/framework/services/contracts';
import { KafkaQueueService } from '@/framework/services';

export class ServicesSingletonFactory {
    private static instance: Promise<ServicesSingletonFactory> | null;

    private constructor(public readonly queue: QueueServiceInterface) {}

    public static async getInstance(): Promise<ServicesSingletonFactory> {
        if (!ServicesSingletonFactory.instance) {
            const queue = new KafkaQueueService();
            await queue.setProducer();
            await queue.setConsumer('topic-customer', true, 'group-clean');

            return new ServicesSingletonFactory(queue);
        }

        return ServicesSingletonFactory.instance;
    }
}
