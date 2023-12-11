import { IoRedisCacheProvider, VittaTokenProvider } from '@/framework/providers';
import { CacheProviderInterface, TokenProviderInterface } from '@/framework/providers/contracts';

export class ProvidersSingletonFactory {
    private static instance: Promise<ProvidersSingletonFactory> | null;

    private constructor(
        public readonly token: TokenProviderInterface,
        public readonly cache: CacheProviderInterface
    ) {}

    public static async getInstance(): Promise<ProvidersSingletonFactory> {
        if (!ProvidersSingletonFactory.instance) {
            const token = new VittaTokenProvider();
            const cache = new IoRedisCacheProvider();

            return new ProvidersSingletonFactory(token, cache);
        }

        return ProvidersSingletonFactory.instance;
    }
}
