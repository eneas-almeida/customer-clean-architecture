export interface CacheProviderInterface {
    save?(key: string, value: string | boolean, timeToExpires: number): Promise<void>;
    findByKey?(key: string): Promise<string | null>;
    invalidate?(key: string): Promise<void>;
    clearAllCacheByPrefix?(prefix: string): Promise<void>;
}
