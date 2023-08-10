import axios, { AxiosInstance } from 'axios';
import { VittaGateway } from '@/infra/gateways/vitta.gateway';
import { TokenProviderInterface } from '../@shared/contracts/provider';
import { AppError } from '@/domain/@shared/errors';

export class VittaTokenProvider implements TokenProviderInterface {
    private readonly vittaGateway: VittaGateway;

    constructor(httpsClient?: AxiosInstance) {
        this.vittaGateway = new VittaGateway(httpsClient || axios);
    }

    async generateToken(): Promise<string> {
        try {
            const token = await this.vittaGateway.getAccessToken();

            if (!token) {
                throw new AppError('Token não gerado pelo gateway');
            }

            return token;
        } catch (e) {
            throw e;
        }
    }

    async verifyToken(token: string, secret: string): Promise<boolean> {
        return true;
    }
}
