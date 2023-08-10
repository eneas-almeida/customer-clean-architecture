import { AxiosInstance } from 'axios';
import { CacheProviderInterface, TokenProviderInterface } from '../@shared/contracts/provider';
import { VittaGateway } from '@/infra/gateways/vitta.gateway';
import { AppError } from '@/domain/@shared/errors';

export class VittaTokenProvider implements TokenProviderInterface {
    private readonly vittaGateway: VittaGateway;
    private readonly cacheProvider: CacheProviderInterface;

    constructor(httpsClient: AxiosInstance, cacheProvider: CacheProviderInterface) {
        this.vittaGateway = new VittaGateway(httpsClient);
        this.cacheProvider = cacheProvider;
    }

    async generateToken(): Promise<string> {
        try {
            const existsToken = await this.cacheProvider.findByKey('tokenx');

            if (existsToken) {
                return existsToken;
            }

            const generateToken = await this.vittaGateway.getAccessToken();

            if (!generateToken) {
                throw new AppError('Error on generate token', 400);
            }

            const { access_token, expires_in } = generateToken;

            await this.cacheProvider.save('tokenx', access_token, expires_in);

            return access_token;
        } catch (e) {
            throw e;
        }
    }

    async verifyToken(token: string, secret: string): Promise<boolean> {
        try {
            return false;
        } catch (e) {
            throw e;
        }
    }
}
