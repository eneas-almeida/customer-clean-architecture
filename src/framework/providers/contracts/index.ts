import { CacheProviderInterface } from './cache';
import { TokenProviderInterface } from './token';

export * from './cache';
export * from './token';

export interface ProviderInterface {
    token?: TokenProviderInterface;
    cache?: CacheProviderInterface;
}
