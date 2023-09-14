import { Router } from 'express';
import {
    customerCreateControllerAdapter,
    customerFindOneControllerAdapter,
    customerUpdateControllerAdapter,
} from '../adapters/controllers/customer-controller.adapter';
import { MakeCustomerController } from '../containers';
import { MakeAuthorization } from '../containers/authorization.container';

export default async (router: Router): Promise<void> => {
    const authorization = MakeAuthorization();
    const customerController = await MakeCustomerController();

    const base = '/customers';

    router.post(base, authorization, customerCreateControllerAdapter(customerController));
    router.put(`${base}/:id`, authorization, customerUpdateControllerAdapter(customerController));
    router.get(`${base}/:id`, authorization, customerFindOneControllerAdapter(customerController));

    console.log(`[ok] ${base} (POST) (AUTH)`);
    console.log(`[ok] ${base}:id (PUT) (AUTH)`);
    console.log(`[ok] ${base}:id (GET) (AUTH)`);
};
