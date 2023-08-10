import { AxiosHttpClient } from '@/commons/clients/axios-http.client';
import { IoRedisCacheProvider } from '@/infra/providers/cache/ioredis-cache.provider';
import { VittaTokenProvider } from '@/infra/providers/token/vitta-token.provider';
import { AccountControllerInterface } from '@/presentation/@shared/contracts';
import { AccountController } from '@/presentation/controllers/account.controller';
import { GenerateTokenUseCase } from '@/usecase/account';

export const MakeAccountController = async (): Promise<AccountControllerInterface> => {
    const axiosInstance = new AxiosHttpClient().getInstance();
    const ioRedisCacheProvider = new IoRedisCacheProvider();

    const vittaTokenProvider = new VittaTokenProvider(axiosInstance, ioRedisCacheProvider);

    const generateTokenUseCase = new GenerateTokenUseCase(vittaTokenProvider);

    return new AccountController(generateTokenUseCase);
};
