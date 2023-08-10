import { Router } from 'express';
import {
    createControllerAdapter,
    findOneControllerAdapter,
    updateControllerAdapter,
} from '../adapters/controllers/customer-controller.adapter';
import { MakeCustomerController } from '../factories';

export default async (router: Router): Promise<void> => {
    const customerController = await MakeCustomerController();

    router.post('/customers', createControllerAdapter(customerController));
    router.patch('/customers/:id', updateControllerAdapter(customerController));
    router.get('/customers/:id', findOneControllerAdapter(customerController));
};
