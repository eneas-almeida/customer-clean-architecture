import { IoRedisCacheProvider, JwtTokenProvider } from '@/infra/providers';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';

export const MakeAuthorization = (): any => {
    const vittaTokenProvider = new JwtTokenProvider();
    const ioRedisCacheProvider = new IoRedisCacheProvider();

    const middleware = new AuthorizationMiddleware(vittaTokenProvider, ioRedisCacheProvider);

    return middleware.handle.bind(middleware);
};
