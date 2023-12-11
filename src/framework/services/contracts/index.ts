import { QueueServiceInterface } from './queue';

export * from './queue';

export interface ServicesInterface {
    queue?: QueueServiceInterface;
}
