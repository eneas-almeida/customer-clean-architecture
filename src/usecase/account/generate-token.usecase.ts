import { TokenProviderInterface } from '@/infra/providers/@shared/contracts/provider';

export class GenerateTokenUseCase {
    private readonly tokenProvider: TokenProviderInterface;

    constructor(tokenProvider: TokenProviderInterface) {
        this.tokenProvider = tokenProvider;
    }

    async execute(): Promise<string> {
        return this.tokenProvider.generateToken();
    }
}
