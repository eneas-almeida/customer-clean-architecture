import { IoRedisCacheProvider, VittaTokenProvider } from '@/framework/providers';
import {
    CacheProviderInterface,
    ProvidersInterface,
    TokenProviderInterface,
} from '@/framework/providers/contracts';

export const MakeTokenProvider = async (): Promise<TokenProviderInterface> => {
    const token = new VittaTokenProvider();
    return token;
};

export const MakeCacheProvider = async (): Promise<CacheProviderInterface> => {
    const cache = new IoRedisCacheProvider();
    return cache;
};

export const MakeProviders = async (): Promise<ProvidersInterface> => {
    const token = await MakeTokenProvider();
    const cache = await MakeCacheProvider();
    return { token, cache };
};
