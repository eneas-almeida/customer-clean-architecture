import { TokenProviderInterface, TokenProviderOutputDto } from './contracts';

export class JwtTokenProvider implements TokenProviderInterface {
    async generateToken(): Promise<TokenProviderOutputDto> {
        return {
            access_token: '',
            expires_in: 0,
            refresh_expires: 0,
            token_type: '',
            'not-before-policy': 0,
            scope: '',
            id_token: '',
        };
    }
}
