import { QueueServiceInterface } from '@/framework/services/contracts';
import { KafkaQueueConfig } from '../configs';

export class ServicesSingletonFactory {
    private static instance: Promise<ServicesSingletonFactory> | null;

    private constructor(public readonly queue: QueueServiceInterface) {}

    public static async getInstance(): Promise<ServicesSingletonFactory> {
        if (!ServicesSingletonFactory.instance) {
            const queue = await KafkaQueueConfig();

            return new ServicesSingletonFactory(queue);
        }

        return ServicesSingletonFactory.instance;
    }
}
