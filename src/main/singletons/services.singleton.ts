import { AxiosInstance } from 'axios';
import { QueueServiceInterface } from '@/infra/services/queue/contracts';
import { MakeServices } from '../factories';
import { CacheServiceInterface } from '@/infra/services';

export class ServicesSingleton {
    private static instance: Promise<ServicesSingleton> | null;

    private constructor(
        public readonly cache: CacheServiceInterface,
        public readonly queue: QueueServiceInterface,
        public readonly httpClient: AxiosInstance
    ) {}

    public static async getInstance(): Promise<ServicesSingleton> {
        if (!ServicesSingleton.instance) {
            const { cache, queue, httpClient } = await MakeServices();

            return new ServicesSingleton(cache, queue, httpClient);
        }

        return ServicesSingleton.instance;
    }
}
