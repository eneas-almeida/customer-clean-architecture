import { TokenProviderInterface } from '@/framework/providers/token/contracts';
import { CacheServiceInterface } from '@/infra/services/cache/contracts';
import { envs } from '@/main/configs';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';

export class AuthorizationMiddleware {
    constructor(
        private readonly tokenProvider: TokenProviderInterface,
        private readonly cacheService: CacheServiceInterface
    ) {}

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
        const token = await this.tokenProvider.generate();

        if (!token || !token.access_token) return null;

        return token.access_token;
    }

    private async getTokenWithCache(): Promise<string | null> {
        const existsToken = await this.cacheService.findByKey('token');

        if (existsToken) return existsToken;

        const token = await this.tokenProvider.generate();

        if (!token || !token.access_token) return null;

        const { access_token, expires_in } = token;

        await this.cacheService.save('token', access_token, expires_in);

        return access_token;
    }
}
