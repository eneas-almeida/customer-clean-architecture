import { Router } from 'express';
import {
    customerCreateControllerAdapter,
    customerFindOneControllerAdapter,
    customerUpdateControllerAdapter,
} from '../adapters/controllers/customer-controller.adapter';
import { MakeCustomerController } from '../containers';

export default async (router: Router): Promise<void> => {
    const makeCustomerController = await MakeCustomerController();

    const base = 'customers';

    router.post(`/${base}`, customerCreateControllerAdapter(makeCustomerController));
    router.put(`/${base}/:id`, customerUpdateControllerAdapter(makeCustomerController));
    router.get(`/${base}/:id`, customerFindOneControllerAdapter(makeCustomerController));

    console.log(`\nCUSTOMERS`);
    console.log(`[ok] /${base} (POST) (AUTH NO)`);
    console.log(`[ok] /${base}:id (PUT) (AUTH NO)`);
    console.log(`[ok] /${base}:id (GET) (AUTH NO)`);
};
