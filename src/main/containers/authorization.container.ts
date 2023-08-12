import { VittaTokenProvider } from '@/infra/providers/token/vitta-token.provider';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';
import { AxiosHttpClient } from '@/commons/clients/axios-http.client';
import { IoRedisCacheProvider } from '@/infra/providers/cache/ioredis-cache.provider';

export const MakeAuthorization = (): any => {
    const axiosInstance = new AxiosHttpClient().getInstance();

    const vittaTokenProvider = new VittaTokenProvider(axiosInstance);
    const ioRedisCacheProvider = new IoRedisCacheProvider();

    const middleware = new AuthorizationMiddleware(vittaTokenProvider, ioRedisCacheProvider);

    return middleware.handle.bind(middleware);
};
