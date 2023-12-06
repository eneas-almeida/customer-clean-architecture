import { Router } from 'express';
import {
    customersCreateControllerAdapter,
    customersFindOneControllerAdapter,
    customersUpdateControllerAdapter,
} from '../adapters/controllers/customers-controller.adapter';
import { MakeCustomersController } from '../factories/controllers';

export default async (router: Router): Promise<void> => {
    const customersControllerFactory = await MakeCustomersController();

    const base = 'customers';

    router.post(`/${base}`, customersCreateControllerAdapter(customersControllerFactory));
    router.put(`/${base}/:id`, customersUpdateControllerAdapter(customersControllerFactory));
    router.get(`/${base}/:id`, customersFindOneControllerAdapter(customersControllerFactory));
};
