import { Request, Response } from 'express';
import { HealthzControllerInterface } from '@/presentation/contracts';

export const healthzGetControllerAdapter = (controller: HealthzControllerInterface) => {
    return async (_req: Request, res: Response) => {
        const httpResponse = await controller.handle();

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};
