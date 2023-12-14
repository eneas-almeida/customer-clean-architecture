import { AxiosInstance } from 'axios';
import { QueueServiceInterface } from '@/framework/services/queue/contracts';
import { MakeServices } from '../factories';

export class ServicesSingleton {
    private static instance: Promise<ServicesSingleton> | null;

    private constructor(
        public readonly queue: QueueServiceInterface,
        public readonly httpClient: AxiosInstance
    ) {}

    public static async getInstance(): Promise<ServicesSingleton> {
        if (!ServicesSingleton.instance) {
            const { queue, httpClient } = await MakeServices();

            return new ServicesSingleton(queue, httpClient);
        }

        return ServicesSingleton.instance;
    }
}
