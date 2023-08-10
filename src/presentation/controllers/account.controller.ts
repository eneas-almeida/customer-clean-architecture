import { GenerateTokenUseCase } from '@/usecase/account';
import { AccountControllerInterface } from '../@shared/contracts';
import { HttpResponse, ok } from '../@shared/helpers';

export class AccountController implements AccountControllerInterface {
    constructor(private readonly generateTokenUseCase: GenerateTokenUseCase) {}

    async generateToken(): Promise<HttpResponse<string>> {
        try {
            const token = await this.generateTokenUseCase.execute();
            return ok(token);
        } catch (e) {
            throw e;
        }
    }
}
