import mongoose, { ConnectOptions } from 'mongoose';
import { envs } from './envs';

export const mongodbConfig = async () => {
    const { user, password, host, port, name } = envs.mongodb;

    const uri = `mongodb://${user}:${password}@${host}:${port}/${name}`;

    const options: ConnectOptions = {
        connectTimeoutMS: 10000,
        ssl: false,
        sslCA: null,
    };

    console.log('Tentando conexão com o mongodb...');

    await mongoose
        .connect(uri, options)
        .then((_) => {
            console.log(`[ok] Banco de dados conectado na porta ${port}`);
        })
        .catch((e) => {
            console.log(`[--] erro em conectar com o banco de dados ${port}`);
            throw e;
        });

    console.log('----------------------------------------');
};
