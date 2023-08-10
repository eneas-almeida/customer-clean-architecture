import { app, bannerConfig, routesConfig, dbConfig, serverConfig, exceptionConfig } from '@/main/configs';

export class Main {
    initBanner() {
        bannerConfig();
        return this;
    }

    async initDB() {
        await dbConfig();
        return this;
    }

    async initRoutes() {
        await routesConfig(app);
        return this;
    }

    initException() {
        exceptionConfig(app);
        return this;
    }

    initServer() {
        serverConfig(app);
        return app;
    }
}
