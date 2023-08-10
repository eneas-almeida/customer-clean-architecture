import { Express } from 'express';
import { exception } from '@/main/middlewares';

export const exceptionConfig = (app: Express) => {
    app.use(exception);
};
