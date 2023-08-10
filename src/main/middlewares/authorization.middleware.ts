import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/domain/@shared/errors';
import { TokenProviderInterface } from '@/infra/providers/@shared/contracts/provider';
import { envs } from '@/main/configs';

export class AuthorizationMiddleware {
    private readonly tokenProvider: TokenProviderInterface;

    constructor(tokenProvider: TokenProviderInterface) {
        this.tokenProvider = tokenProvider;
    }

    handle(req: Request, _: Response, next: NextFunction): void {
        const schemaToken = req.headers.authorization;

        if (!schemaToken) {
            throw new AppError('Token not provided!', 404);
        }

        const parts = schemaToken.split(' ');

        if (parts.length !== 2) {
            throw new AppError('Token parts invalid!', 403);
        }

        const [schema, token] = parts;

        if (schema !== 'Bearer') {
            throw new AppError('Token parts invalid!', 403);
        }

        const isValidToken = this.tokenProvider.verifyToken(token, envs.api.tokenSecret);

        if (!isValidToken) {
            throw new AppError('Token invalid!', 403);
        }

        next();
    }
}
