import { IoRedisCacheProvider, VittaTokenProvider } from '@/framework/providers';
import { CacheProviderInterface, TokenProviderInterface } from '@/framework/providers/contracts';

class ProvidersSingletonFactory {
    public token: TokenProviderInterface;
    public cache: CacheProviderInterface;

    constructor() {
        this.make();
    }

    make() {
        this.token = new VittaTokenProvider();
        this.cache = new IoRedisCacheProvider();
    }
}

export default new ProvidersSingletonFactory();
