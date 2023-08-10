import { Express } from 'express';
import { ExceptionMiddleware } from '@/main/middlewares';

export const exceptionConfig = (app: Express) => {
    const exception = new ExceptionMiddleware();
    app.use(exception.handle);
};
