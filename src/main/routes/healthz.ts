import { Router } from 'express';
import { healthzGetControllerAdapter } from '../adapters/controllers';
import { envs } from '../configs';
import { MakeHealthzController } from '../factories/controllers/healthz-controller.factory';

export default async (router: Router): Promise<void> => {
    const makeHealthzController = await MakeHealthzController();

    const basePath = 'healthz';

    router.get(`/${basePath}`, healthzGetControllerAdapter(makeHealthzController));
};
