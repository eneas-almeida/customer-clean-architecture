import { Router } from 'express';
import {
    createControllerAdapter,
    findOneControllerAdapter,
    updateControllerAdapter,
} from '../adapters/controllers/customer-controller.adapter';
import { MakeCustomerController } from '../containers';
import { MakeAuthorization } from '../containers/authorization.container';

export default async (router: Router): Promise<void> => {
    const authorization = MakeAuthorization();
    const customerController = await MakeCustomerController();

    router.post('/customers', authorization, createControllerAdapter(customerController));
    router.put('/customers/:id', authorization, updateControllerAdapter(customerController));
    router.get('/customers/:id', authorization, findOneControllerAdapter(customerController));

    console.log(`[ok] /customers (POST)`);
    console.log(`[ok] /customers/:id (PUT)`);
    console.log(`[ok] /customers/:id (GET)`);
};
