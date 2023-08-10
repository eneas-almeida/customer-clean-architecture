import { Router } from 'express';
import {
    createControllerAdapter,
    findOneControllerAdapter,
    updateControllerAdapter,
} from '../adapters/controllers';
import { MakeAuthorization, MakeCustomerController } from '../containers';

export default async (router: Router): Promise<void> => {
    const authorization = MakeAuthorization();
    const customerController = await MakeCustomerController();

    router.post('/customers', authorization, createControllerAdapter(customerController));
    router.patch('/customers/:id', authorization, updateControllerAdapter(customerController));
    router.get('/customers/:id', authorization, findOneControllerAdapter(customerController));
};
