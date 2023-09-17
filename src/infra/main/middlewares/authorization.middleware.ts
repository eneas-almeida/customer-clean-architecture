import { NextFunction, Request, Response } from 'express';
import { CacheProviderInterface, TokenProviderInterface } from '@/framework/providers/contracts';
import { envs } from '@/infra/main/configs';
import { AppError } from '../errors';

export class AuthorizationMiddleware {
    private readonly tokenProvider: TokenProviderInterface;
    private readonly cacheProvider: CacheProviderInterface;

    constructor(tokenProvider: TokenProviderInterface, cacheProvider: CacheProviderInterface) {
        this.tokenProvider = tokenProvider;
        this.cacheProvider = cacheProvider;
    }

    async handle(req: Request, _: Response, next: NextFunction): Promise<void> {
        const strategyToken = envs.strategy.token;

        const token =
            strategyToken === 'cache' ? await this.getTokenWithCache() : await this.getTokenWithoutCache();

        if (!token) {
            throw new AppError('not authorized', 401);
        }

        req.headers.Authorization = token;

        next();
    }

    private async getTokenWithoutCache(): Promise<string | null> {
        try {
            const token = await this.tokenProvider.generateToken();

            if (!token || !token.access_token) return null;

            return token.access_token;
        } catch (e) {
            throw e;
        }
    }

    private async getTokenWithCache(): Promise<string | null> {
        try {
            const existsToken = await this.cacheProvider.findByKey('token');

            if (existsToken) return existsToken;

            const token = await this.tokenProvider.generateToken();

            if (!token || !token.access_token) return null;

            const { access_token, expires_in } = token;

            await this.cacheProvider.save('token', access_token, expires_in);

            return access_token;
        } catch (e) {
            throw e;
        }
    }
}
