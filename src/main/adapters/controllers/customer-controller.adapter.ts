import { Request, Response } from 'express';
import { CustomerMapper } from '@/main/mappers';
import { CustomerControllerInterface } from '@/presentation/contracts';
import { dataFindOneHelper } from '../../helpers/controllers.helper';

export const customerCreateControllerAdapter = (controller: CustomerControllerInterface) => {
    return async (req: Request, res: Response) => {
        const inputCreateCustomerDto = CustomerMapper.dataToDto(req.body, req.headers);

        const httpResponse = await controller.create(inputCreateCustomerDto);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};

export const customerUpdateControllerAdapter = (controller: CustomerControllerInterface) => {
    return async (req: Request, res: Response) => {
        const inputUpdateCustomerDto = CustomerMapper.dataToDto(req.body, req.headers);

        const httpResponse = await controller.update(req.params.id, inputUpdateCustomerDto);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};

export const customerFindOneControllerAdapter = (controller: CustomerControllerInterface) => {
    return async (req: Request, res: Response) => {
        const data = dataFindOneHelper(req.params, req.headers);

        const httpResponse = await controller.findOne(data);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};
