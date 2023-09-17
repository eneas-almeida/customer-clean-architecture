import {
    app,
    envsValidate,
    bannerConfig,
    routesConfig,
    mongodbConfig,
    serverConfig,
    errorConfig,
} from '@/infra/main/configs';

export class Main {
    initBanner() {
        bannerConfig();
        return this;
    }

    initEnvs() {
        envsValidate();
        return this;
    }

    initLogger() {
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

    initError() {
        errorConfig(app);
        return this;
    }

    initServer() {
        serverConfig(app);
        return app;
    }
}
