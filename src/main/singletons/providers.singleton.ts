import { CacheProviderInterface, TokenProviderInterface } from '@/framework/providers/contracts';
import { MakeProviders } from '../factories';

export class ProvidersSingleton {
    private static instance: Promise<ProvidersSingleton> | null;

    private constructor(
        public readonly token: TokenProviderInterface,
        public readonly cache: CacheProviderInterface
    ) {}

    public static async getInstance(): Promise<ProvidersSingleton> {
        if (!ProvidersSingleton.instance) {
            const { token, cache } = await MakeProviders();

            return new ProvidersSingleton(token, cache);
        }

        return ProvidersSingleton.instance;
    }
}
