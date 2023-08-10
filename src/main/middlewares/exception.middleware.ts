import { Errback, Request, Response, NextFunction } from 'express';
import { AppError, NotificationError } from '@/domain/@shared/errors';

export class ExceptionMiddleware {
    handle(err: Errback, req: Request, res: Response, _: NextFunction) {
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
            });
        }

        if (err instanceof Error) {
            return res.status(400).json({
                statusCode: 400,
                message: err.message,
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Internal server error, contact the administrator',
        });
    }
}
