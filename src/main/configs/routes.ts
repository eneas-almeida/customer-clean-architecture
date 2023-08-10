import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

export const routesConfig = async (app: Express): Promise<void> => {
    const router = Router();

    app.use('/api/v1', router);

    const filePath = join(__dirname, '../routes');

    for (const fileName of readdirSync(filePath)) {
        (await import(`../routes/${fileName}`)).default(router);
    }

    console.log('Routes ok');
};
