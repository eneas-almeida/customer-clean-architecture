import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

export const routesConfig = async (app: Express): Promise<void> => {
    try {
        console.log('Carregando rotas...');

        const router = Router();

        const version = '/api/v1';

        app.use(version, router);

        const filePath = join(__dirname, '../routes');

        for (const fileName of readdirSync(filePath)) {
            (await import(`../routes/${fileName}`)).default(router);
        }
    } catch (e) {
        throw e;
    }
};
