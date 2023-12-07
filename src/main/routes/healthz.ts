import { Router } from 'express';
import { healthzGetControllerAdapter } from '../adapters/controllers';
import { MakeHealthzController } from '../factories/controllers/healthz-controller.factory';

export default async (router: Router): Promise<void> => {
    const makeHealthzController = await MakeHealthzController();

    const base = 'healthz';

    router.get(`/${base}`, healthzGetControllerAdapter(makeHealthzController));
};
