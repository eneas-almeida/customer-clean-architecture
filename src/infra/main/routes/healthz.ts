import { Router } from 'express';
import { healthzGetControllerAdapter } from '../adapters/controllers';
import { MakeHealthzController } from '../containers/healthz-controller.container';

export default async (router: Router): Promise<void> => {
    const makeHealthzController = await MakeHealthzController();

    router.get('/healthz', healthzGetControllerAdapter(makeHealthzController));

    console.log(`\nHEALTHZ`);
    console.log(`[ok] /healthz (GET) (AUTH NO)`);
};
