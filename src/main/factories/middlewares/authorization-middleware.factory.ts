import { AuthorizationMiddleware } from '@/main/middlewares';
import { ProvidersSingleton, ServicesSingleton } from '@/main/singletons';

export const MakeAuthorizationMiddleware = async () => {
    const { token } = await ProvidersSingleton.getInstance();
    const { cache } = await ServicesSingleton.getInstance();

    const middleware = new AuthorizationMiddleware(token, cache);

    return middleware.handle.bind(middleware);
};
