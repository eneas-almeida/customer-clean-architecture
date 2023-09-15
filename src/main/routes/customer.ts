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

    router.post(base, customerCreateControllerAdapter(customerController));
    router.put(`${base}/:id`, customerUpdateControllerAdapter(customerController));
    router.get(`${base}/:id`, customerFindOneControllerAdapter(customerController));

    console.log(`[ok] ${base} (POST) (AUTH NO)`);
    console.log(`[ok] ${base}:id (PUT) (AUTH NO)`);
    console.log(`[ok] ${base}:id (GET) (AUTH NO)`);
};
