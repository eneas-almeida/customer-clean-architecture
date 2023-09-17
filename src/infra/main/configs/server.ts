import { Express } from 'express';
import { envs } from '@/infra/main/configs';

export const serverConfig = (app: Express) => {
    const { port } = envs.api;

    app.listen(port, () => {
        console.log('----------------------------------------');
        console.log(`Escutando na porta ${port}`);
        console.log('----------------------------------------');
    });
};
