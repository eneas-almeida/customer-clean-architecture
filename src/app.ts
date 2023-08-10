import { Main } from './main';

const main = new Main();

main.initBanner()
    .initDB()
    .then((res) => {
        res.initRoutes()
            .then((res) => {
                res.initException();
                res.initServer();
            })
            .catch((e) => {
                throw new Error(e);
            });
    })
    .catch((e) => {
        throw new Error(e);
    });
