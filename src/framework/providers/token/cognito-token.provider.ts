import { CognitoIntegrationInterface } from '@/framework/integrations/contracts/cognito';
import { TokenProviderInterface, TokenProviderOutputDto } from './contracts';

export class CognitoTokenProvider implements TokenProviderInterface {
    constructor(private readonly cognitoIntegration: CognitoIntegrationInterface) {}

    async generate(): Promise<TokenProviderOutputDto> {
        return this.cognitoIntegration.getToken();
    }

    async validate(token: string): Promise<boolean> {
        return this.cognitoIntegration.validate(token);
    }
}
