import { Errback, NextFunction, Request, Response } from 'express';
import { NotificationError } from '@/domain/@shared/errors';
import { envs } from '../configs';
import { AppError } from '../errors';
import { errorMessageAdapter } from '../helpers';

export class ErrorMiddleware {
    async handle(err: Errback, req: Request, res: Response, _next: NextFunction) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message,
            });
        }

        if (err instanceof NotificationError) {
            return res.status(400).json({
                statusCode: 400,
                message: err.message,
                description: err.description,
            });
        }

        if (envs.api.ambient === 'development') {
            return res.status(500).json(await errorMessageAdapter(err, req));
        }

        return res.status(500).json({
            statusCode: 500,
            message: 'Internal server error, contact the administrator',
            description: err.name,
        });
    }
}
