import { IoRedisCacheService, CognitoTokenProvider } from '@/framework/providers';
import { AuthorizationMiddleware } from '@/main/middlewares';

export const MakeAuthorizationMiddleware = () => {
    const vittaTokenProvider = new CognitoTokenProvider();
    const ioRedisCacheProvider = new IoRedisCacheService();

    const middleware = new AuthorizationMiddleware(vittaTokenProvider, ioRedisCacheProvider);

    return middleware.handle.bind(middleware);
};
