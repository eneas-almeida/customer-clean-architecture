import { Express } from 'express';
import { ErrorMiddleware } from '@/main/middlewares';

export const errorConfig = (app: Express) => {
    const exception = new ErrorMiddleware();
    app.use(exception.handle);
};
