import { VittaTokenProvider } from '@/framework/providers';
import { ProviderInterface } from '@/framework/providers/contracts';

export const MakeProviders = (): ProviderInterface => {
    return {
        token: new VittaTokenProvider(),
    };
};
