import mongoose, { ConnectOptions } from 'mongoose';
import { envs } from './envs';

export const dbConfig = async () => {
    const { user, password, host, port, name } = envs.db;

    const uri = `mongodb://${user}:${password}@${host}:${port}/${name}`;

    const options: ConnectOptions = {
        connectTimeoutMS: 10000,
        ssl: false,
        sslCA: null,
    };

    console.log('Testando a conexão com o banco de dados...');

    await mongoose
        .connect(uri, options)
        .then((_) => {
            console.log(`Banco de dados conectado na porta ${port}`);
        })
        .catch((e) => {
            throw e;
        });
};
