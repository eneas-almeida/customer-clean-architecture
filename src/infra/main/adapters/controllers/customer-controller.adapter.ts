import { Request, Response } from 'express';
import { CustomerMapper } from '@/data/mappers';
import { dataFindOneHelper, dataUpdatedHelper } from '@/infra/main/helpers/controllers.helper';
import { CustomerControllerInterface } from '@/presentation/contracts';

export const customerCreateControllerAdapter = (controller: CustomerControllerInterface) => {
    return async (req: Request, res: Response) => {
        const inputCreateCustomerDto = CustomerMapper.dataToDto(req.body);

        const httpResponse = await controller.create(inputCreateCustomerDto);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};

export const customerUpdateControllerAdapter = (controller: CustomerControllerInterface) => {
    return async (req: Request, res: Response) => {
        const input = dataUpdatedHelper(req.params, req.body);

        const httpResponse = await controller.update(input);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};

export const customerFindOneControllerAdapter = (controller: CustomerControllerInterface) => {
    return async (req: Request, res: Response) => {
        const input = dataFindOneHelper(req.params, req.headers);

        const httpResponse = await controller.findOne(input);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};
