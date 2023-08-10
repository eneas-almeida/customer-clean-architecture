import { Express } from 'express';
import { envs } from '@/main/configs';

export const serverConfig = (app: Express) => {
    const { port } = envs.app;

    app.listen(port, () => {
        console.log(`listening on ${port}`);
    });
};
