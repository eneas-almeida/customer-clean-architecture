import { CacheProviderInterface } from './cache';
import { TokenProviderInterface } from './token';

export * from './cache';
export * from './token';

export interface ProvidersInterface {
    cache?: CacheProviderInterface;
    token?: TokenProviderInterface;
}
