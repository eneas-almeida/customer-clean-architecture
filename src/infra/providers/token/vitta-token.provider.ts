import { AxiosInstance } from 'axios';
import { verify, sign } from 'jsonwebtoken';
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
            const existsToken = await this.cacheProvider.findByKey('token');

            if (existsToken) {
                return existsToken;
            }

            const generateToken = await this.vittaGateway.getAccessToken();

            if (!generateToken) {
                throw new AppError('Erro em gerar o token', 400);
            }

            const { access_token, expires_in } = generateToken;

            await this.cacheProvider.save('token', access_token, expires_in);

            return access_token;
        } catch (e) {
            throw e;
        }
    }

    verifyToken(token: string, secret: string): boolean {
        try {
            const payload = sign(token, secret, { algorithm: 'HS256' });

            verify(payload, secret, { algorithms: ['HS256'] });

            return true;
        } catch (e) {
            throw e;
        }
    }
}
