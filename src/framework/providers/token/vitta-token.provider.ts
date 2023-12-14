import { TokenProviderInterface, TokenProviderOutputDto } from './contracts';

export class VittaTokenProvider implements TokenProviderInterface {
    constructor(private readonly cognitoIntegration: any) {}

    async generate(): Promise<TokenProviderOutputDto> {
        return this.cognitoIntegration.getToken();
    }

    async validate(token: string): Promise<boolean> {
        return this.cognitoIntegration.validate(token);
    }
}
