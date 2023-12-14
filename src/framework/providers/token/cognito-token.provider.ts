import { VittaIntegrationInterface } from '@/framework/integrations/contracts';
import { TokenProviderInterface, TokenProviderOutputDto } from './contracts';

export class CognitoTokenProvider implements TokenProviderInterface {
    constructor(private readonly vittaIntegration: VittaIntegrationInterface) {}

    async generate(): Promise<TokenProviderOutputDto> {
        return this.vittaIntegration.getToken();
    }

    async validate(token: string): Promise<boolean> {
        return this.vittaIntegration.validate(token);
    }
}
