import { IoRedisCacheProvider, VittaTokenProvider } from '@/framework/providers';

export const MakeProviders = () => {
    return {
        cache: new IoRedisCacheProvider(),
        token: new VittaTokenProvider(),
    };
};
