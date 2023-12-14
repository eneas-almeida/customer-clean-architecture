import { AxiosInstance } from 'axios';
import { QueueServiceInterface } from './queue/contracts';

export * from './http/contracts';
export * from './queue/contracts';

export * from './http/axios-http-client.service';
export * from './queue/kafka-queue.service';
export * from './queue/rabbit-queue.service';

export interface ServicesInterface {
    queue?: QueueServiceInterface;
    httpClient?: AxiosInstance;
}
