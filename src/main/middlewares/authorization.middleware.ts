import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/domain/@shared/errors';
import { CacheProviderInterface, TokenProviderInterface } from '@/infra/providers/@shared/contracts/provider';

export class AuthorizationMiddleware {
    private readonly tokenProvider: TokenProviderInterface;
    private readonly cacheProvider: CacheProviderInterface;

    constructor(tokenProvider: TokenProviderInterface, cacheProvider: CacheProviderInterface) {
        this.tokenProvider = tokenProvider;
        this.cacheProvider = cacheProvider;
    }

    async handle(req: Request, _: Response, next: NextFunction): Promise<void> {
        try {
            const existsToken = await this.cacheProvider.findByKey('token');

            if (existsToken) {
                req.headers.Authorization = existsToken;
                next();
            }

            const generateToken = await this.tokenProvider.generateToken();

            if (!generateToken) {
                if (!generateToken) {
                    throw new AppError('não autorizado', 401);
                }
            }

            const { access_token, expires_in } = generateToken;

            req.headers.Authorization = access_token;

            await this.cacheProvider.save('token', access_token, expires_in);

            next();
        } catch (e) {
            throw e;
        }
    }
}
