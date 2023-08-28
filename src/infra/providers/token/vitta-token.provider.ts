import { AxiosInstance } from 'axios';
import { OutputTokenDto, TokenProviderInterface } from '../@shared/contracts/provider';
import { VittaService } from '@/infra/services/vitta.service';
import { AppError } from '@/domain/@shared/errors';

export class VittaTokenProvider implements TokenProviderInterface {
    private readonly vittaService: VittaService;

    constructor(httpsClient: AxiosInstance) {
        this.vittaService = new VittaService(httpsClient);
    }

    async getAccessToken(): Promise<OutputTokenDto> {
        try {
            const token = await this.vittaService.getAccessToken();

            if (!token) {
                throw new AppError('token não gerado', 400);
            }

            return token;
        } catch (e) {
            throw new AppError('sso indisponível', 502);
        }
    }
}
