import { Request, Response } from 'express';
import { CustomerMapper } from '@/infra/mappers';
import { CustomerControllerInterface } from '@/presentation/@shared/contracts';

export const createControllerAdapter = (controller: CustomerControllerInterface) => {
    return async (req: Request, res: Response) => {
        const inputCreateCustomerDto = CustomerMapper.dataToDto(req.body);

        const httpResponse = await controller.create(inputCreateCustomerDto);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};

export const updateControllerAdapter = (controller: CustomerControllerInterface) => {
    return async (req: Request, res: Response) => {
        const inputUpdateCustomerDto = CustomerMapper.dataToDto(req.body);

        const { id } = req.params;

        const httpResponse = await controller.update(id, inputUpdateCustomerDto);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};

export const findOneControllerAdapter = (controller: CustomerControllerInterface) => {
    return async (req: Request, res: Response) => {
        const { id } = req.params;

        const httpResponse = await controller.findOne({ id });

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};
