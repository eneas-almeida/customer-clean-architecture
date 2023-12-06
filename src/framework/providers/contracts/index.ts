import { CacheProviderInterface } from './cache';
import { QueueProviderInterface } from '../../../main/queues/contracts/queue';
import { TokenProviderInterface } from './token';

export * from './cache';
export * from '../../../main/queues/contracts/queue';
export * from './token';

export interface ProviderInterface {
    cache?: CacheProviderInterface;
    queue?: QueueProviderInterface;
    token?: TokenProviderInterface;
}
