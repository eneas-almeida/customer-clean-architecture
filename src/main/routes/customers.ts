import { Router } from 'express';
import {
    customersCreateControllerAdapter,
    customersFindOneControllerAdapter,
    customersUpdateControllerAdapter,
} from '../adapters/controllers/customers-controller.adapter';
import { MakeCustomersController } from '../factories/controllers';

export default async (router: Router): Promise<void> => {
    const customersControllerFactory = MakeCustomersController();

    const basePath = 'customers';

    router.post(`/${basePath}`, customersCreateControllerAdapter(customersControllerFactory));
    router.put(`/${basePath}/:id`, customersUpdateControllerAdapter(customersControllerFactory));
    router.get(`/${basePath}/:id`, customersFindOneControllerAdapter(customersControllerFactory));
};
