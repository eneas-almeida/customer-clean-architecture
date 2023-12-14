import { CacheProviderInterface } from './cache/contracts';
import { TokenProviderInterface } from './token/contracts';

export * from './cache/contracts';
export * from './token/contracts';

export * from './cache/ioredis-cache.provider';
export * from './token/jwt-token.provider';
export * from './token/vitta-token.provider';

export interface ProvidersInterface {
    cache?: CacheProviderInterface;
    token?: TokenProviderInterface;
}
