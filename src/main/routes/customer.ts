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

    const base = '/customers';

    router.post(base, authorization, createControllerAdapter(customerController));
    router.put(`${base}/:id`, authorization, updateControllerAdapter(customerController));
    router.get(`${base}/:id`, authorization, findOneControllerAdapter(customerController));

    console.log(`[ok] ${base} (POST) (AUTH)`);
    console.log(`[ok] ${base}:id (PUT) (AUTH)`);
    console.log(`[ok] ${base}:id (GET) (AUTH)`);
};
