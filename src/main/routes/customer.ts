import { Router } from 'express';
import {
    customerCreateControllerAdapter,
    customerFindOneControllerAdapter,
    customerUpdateControllerAdapter,
} from '../adapters/controllers/customer-controller.adapter';
import { envs } from '../configs';
import { MakeCustomerControllerContainer } from '../containers';

export default async (router: Router): Promise<void> => {
    const makeCustomerController = await MakeCustomerControllerContainer();

    const basePath = 'customers';

    router.post(`/${basePath}`, customerCreateControllerAdapter(makeCustomerController));
    router.put(`/${basePath}/:id`, customerUpdateControllerAdapter(makeCustomerController));
    router.get(`/${basePath}/:id`, customerFindOneControllerAdapter(makeCustomerController));

    const baseRoute = `${envs.api.version}/${basePath}`;

    console.log(`${basePath.toUpperCase()}`);
    console.log(`[ok] /${baseRoute} (POST) (AUTH NO)`);
    console.log(`[ok] /${baseRoute}:id (GET) (AUTH NO)`);
    console.log(`[ok] /${baseRoute}:id (PUT) (AUTH NO)`);
};
