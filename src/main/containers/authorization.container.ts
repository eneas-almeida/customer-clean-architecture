import { VittaTokenProvider } from '@/infra/providers/token/vitta-token.provider';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';

export const MakeAuthorization = (): any => {
    const vittaTokenProvider = new VittaTokenProvider();

    const middleware = new AuthorizationMiddleware(vittaTokenProvider);

    return middleware.handle;
};
