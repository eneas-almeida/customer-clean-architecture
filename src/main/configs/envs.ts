import 'dotenv/config';

export const envs = {
    app: {
        name: process.env.APP_NAME || 'customer-api',
        ambient: process.env.APP_AMBIENT || 'development',
        port: process.env.API_PORT || 3000,
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27022,
        user: process.env.DB_USER || 'customer',
        password: process.env.DB_PASSWORD || 'customer',
        name: process.env.DB_NAME || 'customer',
    },
    axios: {
        retryQtty: Number(process.env.AXIOS_RETRY_ATTEMPTS) || 1,
        baseDelay: Number(process.env.AXIOS_BASE_DELAY) || 1000,
        maxDelay: Number(process.env.AXIOS_MAX_DELAY) || 5000,
        agent: {
            maxSockets: Number(process.env.AXIOS_AGENT_MAX_SOCKETS) || 200,
            maxFreeSockets: Number(process.env.AXIOS_AGENT_MAX_FREE_SOCKETS) || 20,
            timeout: Number(process.env.AXIOS_AGENT_TIMEOUT) || 60000,
            freeSocketTimeout: Number(process.env.AXIOS_AGENT_FREE_SOCKET_TIMEOUT) || 30000,
        },
    },
};
