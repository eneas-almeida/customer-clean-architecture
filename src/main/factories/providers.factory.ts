import { IoRedisCacheService, ProvidersInterface, VittaTokenProvider } from '@/framework/providers';
import { CacheServiceInterface } from '@/infra/services/cache/contracts';
import { TokenProviderInterface } from '@/framework/providers/token/contracts';

export const MakeTokenProvider = async (): Promise<TokenProviderInterface> => {
    const token = new VittaTokenProvider();
    return token;
};

export const MakeProviders = async (): Promise<ProvidersInterface> => {
    const token = await MakeTokenProvider();
    return { token };
};
