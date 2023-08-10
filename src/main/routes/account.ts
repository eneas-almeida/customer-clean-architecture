import { Router } from 'express';
import { generateTokenControllerAdapter } from '../adapters/controllers';
import { MakeAccountController } from '../containers/account-controller.container';

export default async (router: Router): Promise<void> => {
    const accountController = await MakeAccountController();

    router.get('/account/token', generateTokenControllerAdapter(accountController));
};
