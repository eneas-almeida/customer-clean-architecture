export interface OutputTokenDto {
    access_token: string;
    expires_in: number;
    refresh_expires: number;
    token_type: string;
    'not-before-policy': number;
    scope: string;
    id_token: string;
}

export interface TokenProviderInterface {
    getAccessToken(): Promise<OutputTokenDto>;
}

export interface CacheProviderInterface {
    save(key: string, value: string | boolean, timeToExpires: number): Promise<void>;
    findByKey(key: string): Promise<string | null>;
    invalidate(key: string): Promise<void>;
    clearAllCacheByPrefix(prefix: string): Promise<void>;
}

export interface ProviderInterface {
    token?: TokenProviderInterface;
    cache?: CacheProviderInterface;
}
