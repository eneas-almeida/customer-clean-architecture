import { OutputTokenDto, TokenProviderInterface } from './contracts';
import { AppError } from '@/domain/@shared/errors';

export class JwtTokenProvider implements TokenProviderInterface {
    async generateToken(): Promise<OutputTokenDto> {
        try {
            return {
                access_token: '',
                expires_in: 0,
                refresh_expires: 0,
                token_type: '',
                'not-before-policy': 0,
                scope: '',
                id_token: '',
            };
        } catch (e) {
            throw new AppError('erro na geração do token', 500);
        }
    }
}
