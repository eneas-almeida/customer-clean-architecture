import { ProvidersInterface, VittaTokenProvider } from '@/framework/providers';
import { TokenProviderInterface } from '@/framework/providers/token/contracts';
import { IntegrationsSingleton } from '../singletons';

export const MakeTokenProvider = async (): Promise<TokenProviderInterface> => {
    const { vitta } = await IntegrationsSingleton.getInstance();
    const token = new VittaTokenProvider(vitta);
    return token;
};

export const MakeProviders = async (): Promise<ProvidersInterface> => {
    const token = await MakeTokenProvider();
    return { token };
};
