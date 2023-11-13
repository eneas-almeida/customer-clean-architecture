import { Request, Response } from 'express';
import { CustomersMapper } from '@/application/mappers';
import { dataFindOneHelper, dataUpdatedHelper } from '@/main/helpers/controllers.helper';
import { CustomersControllerInterface } from '@/presentation/contracts';

export const customersCreateControllerAdapter = (controller: CustomersControllerInterface) => {
    return async (req: Request, res: Response) => {
        const inputCreateCustomerDto = CustomersMapper.dataToDto(req.body);

        const httpResponse = await controller.create(inputCreateCustomerDto);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};

export const customersUpdateControllerAdapter = (controller: CustomersControllerInterface) => {
    return async (req: Request, res: Response) => {
        const input = dataUpdatedHelper(req.params, req.body);

        const httpResponse = await controller.update(input);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};

export const customersFindOneControllerAdapter = (controller: CustomersControllerInterface) => {
    return async (req: Request, res: Response) => {
        const input = dataFindOneHelper(req.params);

        const httpResponse = await controller.findOne(input);

        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};
