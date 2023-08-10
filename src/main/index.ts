import {
    app,
    bannerConfig,
    routesConfig,
    mongodbConfig,
    serverConfig,
    exceptionConfig,
} from '@/main/configs';

export class Main {
    initBanner() {
        bannerConfig();
        return this;
    }

    async initDB() {
        await mongodbConfig();
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
