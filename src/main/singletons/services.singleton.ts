import { QueueServiceInterface } from '@/framework/services/contracts';
import { MakeKafkaQueueService, MakeServices } from '../factories';

export class ServicesSingleton {
    private static instance: Promise<ServicesSingleton> | null;

    private constructor(public readonly queue: QueueServiceInterface) {}

    public static async getInstance(): Promise<ServicesSingleton> {
        if (!ServicesSingleton.instance) {
            const { queue } = await MakeServices();

            return new ServicesSingleton(queue);
        }

        return ServicesSingleton.instance;
    }
}
