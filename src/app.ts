import { MainBuild } from './main';

const main = new MainBuild();

main.initBanner()
    .initEnvs()
    .initLogger()
    .initDB()
    .then((res) => {
        res.initRoutes()
            .then((res) => {
                res.initErrorHandler().initServer();
            })
            .catch((e) => {
                throw new Error(e);
            });
    })
    .catch((e) => {
        throw new Error(e);
    });
