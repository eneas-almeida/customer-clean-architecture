import { Request, Response } from 'express';
import { AccountControllerInterface } from '@/presentation/@shared/contracts';

export const generateTokenControllerAdapter = (controller: AccountControllerInterface) => {
    return async (_req: Request, res: Response) => {
        const httpResponse = await controller.generateToken();

        res.status(httpResponse.statusCode).json(httpResponse.data);
    };
};
