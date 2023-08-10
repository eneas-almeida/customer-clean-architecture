import { CacheProviderInterface, TokenProviderInterface } from '@/infra/providers/@shared/contracts/provider';
import { TokenProxyInterface } from '../@shared/contracts/proxy';

export class TokenProxy implements TokenProxyInterface {
    private readonly cacheProvider: CacheProviderInterface;
    private readonly tokenProvider: TokenProviderInterface;

    constructor(cacheProvider: CacheProviderInterface, tokenProvider: TokenProviderInterface) {
        this.cacheProvider = cacheProvider;
        this.tokenProvider = tokenProvider;
    }

    async getToken(): Promise<string> {
        const token = await this.cacheProvider.findByKey('token');

        if (token) {
            return token;
        }

        const generateToken = await this.tokenProvider.generateToken();

        await this.cacheProvider.save('token', generateToken, 60 * 60 * 24);

        return generateToken;
    }
}
