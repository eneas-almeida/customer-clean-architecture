import { AxiosInstance } from 'axios';
import { OutputTokenDto, TokenProviderInterface } from '../@shared/contracts/provider';
import { VittaGateway } from '@/infra/gateways/vitta.gateway';
import { AppError } from '@/domain/@shared/errors';

export class VittaTokenProvider implements TokenProviderInterface {
    private readonly vittaGateway: VittaGateway;

    constructor(httpsClient: AxiosInstance) {
        this.vittaGateway = new VittaGateway(httpsClient);
    }

    async generateToken(): Promise<OutputTokenDto> {
        try {
            const token = await this.vittaGateway.getAccessToken();

            if (!token) {
                throw new AppError('token não gerado', 400);
            }

            return token;
        } catch (e) {
            throw new AppError('sso indisponível', 502);
        }
    }
}
