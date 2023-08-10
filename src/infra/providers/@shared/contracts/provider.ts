export interface TokenProviderInterface {
    generateToken(): Promise<string>;
    verifyToken(token: string, secret: string): boolean;
}

export interface CacheProviderInterface {
    save(key: string, value: string | boolean, timeToExpires: number): Promise<void>;
    findByKey(key: string): Promise<string | null>;
    invalidate(key: string): Promise<void>;
    clearAllCacheByPrefix(prefix: string): Promise<void>;
}

export interface PaymentProviderInterface {
    pay(amount: number): Promise<number>;
}

export interface ProviderInterface {
    token?: TokenProviderInterface;
    cache?: CacheProviderInterface;
    payment?: PaymentProviderInterface;
}
