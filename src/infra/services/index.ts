import { AxiosInstance } from 'axios';
import { QueueServiceInterface } from './queue/contracts';
import { CacheServiceInterface } from './cache/contracts';

export * from './cache/contracts';
export * from './http/contracts';
export * from './queue/contracts';

export * from './cache/ioredis-cache.service';
export * from './http/axios-http-client.service';
export * from './queue/kafka-queue.service';
export * from './queue/rabbit-queue.service';

export interface ServicesInterface {
    cache?: CacheServiceInterface;
    queue?: QueueServiceInterface;
    httpClient?: AxiosInstance;
}
