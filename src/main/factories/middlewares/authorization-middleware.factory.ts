import { IoRedisCacheProvider, JwtTokenProvider } from '@/framework/providers';
import { AuthorizationMiddleware } from '@/main/middlewares';

export const MakeAuthorizationMiddleware = () => {
    const vittaTokenProvider = new JwtTokenProvider();
    const ioRedisCacheProvider = new IoRedisCacheProvider();

    const middleware = new AuthorizationMiddleware(vittaTokenProvider, ioRedisCacheProvider);

    return middleware.handle.bind(middleware);
};
