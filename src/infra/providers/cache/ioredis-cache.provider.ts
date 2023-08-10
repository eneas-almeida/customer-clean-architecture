import IORedis, { Redis } from 'ioredis';
import { CacheProviderInterface } from '../@shared/contracts/provider';
import { envs } from '@/main/configs';

export class IoRedisCacheProvider implements CacheProviderInterface {
    private readonly cache: Redis;

    constructor() {
        const { port, host, keyPrefix, password } = envs.redis;

        this.cache = new IORedis(port, host, { keyPrefix, password });
    }

    async save(key: string, value: string, timeToExpires: number): Promise<void> {
        await this.cache.set(key, value, 'EX', timeToExpires);
    }

    async findByKey(key: string): Promise<string | null> {
        return await this.cache.get(key);
    }

    async invalidate(key: string): Promise<void> {
        await this.cache.del(key);
    }

    async clearAllCacheByPrefix(prefix: string): Promise<void> {
        const { keyPrefix } = envs.redis;

        const keys = await this.cache.keys(`${keyPrefix}:${prefix}:*`);

        if (!keys.length) return;

        const keysWithoutPrefix = keys.map((key) => key.replace(`${keyPrefix}:`, ''));

        await this.cache.del(keysWithoutPrefix);
    }
}
