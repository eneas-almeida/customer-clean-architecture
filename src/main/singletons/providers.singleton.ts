import { TokenProviderInterface } from '@/framework/providers/token/contracts';
import { MakeProviders } from '../factories';

export class ProvidersSingleton {
    private static instance: Promise<ProvidersSingleton> | null;

    private constructor(public readonly token: TokenProviderInterface) {}

    public static async getInstance(): Promise<ProvidersSingleton> {
        if (!ProvidersSingleton.instance) {
            const { token } = await MakeProviders();

            return new ProvidersSingleton(token);
        }

        return ProvidersSingleton.instance;
    }
}
