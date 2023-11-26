import { Router } from 'express';
import {
    customersCreateControllerAdapter,
    customersFindOneControllerAdapter,
    customersUpdateControllerAdapter,
} from '../adapters/controllers/customers-controller.adapter';
import { envs } from '../configs';
import { MakeCustomerControllerContainer } from '../factories';

export default async (router: Router): Promise<void> => {
    const makeCustomerController = await MakeCustomerControllerContainer();

    const basePath = 'customers';

    router.post(`/${basePath}`, customersCreateControllerAdapter(makeCustomerController));
    router.put(`/${basePath}/:id`, customersUpdateControllerAdapter(makeCustomerController));
    router.get(`/${basePath}/:id`, customersFindOneControllerAdapter(makeCustomerController));

    const baseRoute = `${envs.api.version}/${basePath}`;

    console.log(`${basePath.toUpperCase()}`);
    console.log(`[ok] ${baseRoute} (POST) (AUTH NO)`);
    console.log(`[ok] ${baseRoute}:id (GET) (AUTH NO)`);
    console.log(`[ok] ${baseRoute}:id (PUT) (AUTH NO)`);
};
