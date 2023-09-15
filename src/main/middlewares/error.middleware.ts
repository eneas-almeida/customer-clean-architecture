import { Errback, NextFunction, Request, Response } from 'express';
import { NotificationError } from '@/domain/@shared/errors';
import { AppError, ServerError } from '../errors';

export class ErrorMiddleware {
    handle(e: Errback, _req: Request, res: Response, _next: NextFunction) {
        if (e instanceof AppError) {
            return res.status(e.statusCode).json({
                statusCode: e.statusCode,
                message: e.message,
            });
        }

        if (e instanceof ServerError) {
            return res.status(e.statusCode).json({
                statusCode: e.statusCode,
                message: e.message,
            });
        }

        if (e instanceof NotificationError) {
            return res.status(400).json({
                statusCode: 400,
                message: e.message,
                description: e.description,
            });
        }

        return res.status(500).json({
            statusCode: 500,
            message: 'Internal server error, contact the administrator',
            description: e.name,
        });
    }
}
