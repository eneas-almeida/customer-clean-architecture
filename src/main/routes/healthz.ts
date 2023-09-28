import { Router } from 'express';
import { healthzGetControllerAdapter } from '../adapters/controllers';
import { envs } from '../configs';
import { MakeHealthzControllerContainer } from '../containers/healthz-controller.container';

export default async (router: Router): Promise<void> => {
    const makeHealthzController = await MakeHealthzControllerContainer();

    const basePath = 'healthz';

    router.get(`/${basePath}`, healthzGetControllerAdapter(makeHealthzController));

    const baseRoute = `${envs.api.version}/${basePath}`;

    console.log(`${basePath.toUpperCase()}`);
    console.log(`[ok] ${baseRoute} (GET) (AUTH NO)`);
};
