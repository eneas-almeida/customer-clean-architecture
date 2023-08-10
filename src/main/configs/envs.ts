import 'dotenv/config';

export const envs = {
    api: {
        name: process.env.APP_NAME || 'customer-api',
        ambient: process.env.APP_AMBIENT || 'development',
        port: process.env.API_PORT || 3000,
        tokenSecret: process.env.API_TOKEN_SECRET,
    },
    mongodb: {
        host: process.env.MONGODB_HOST || 'localhost',
        port: process.env.MONGODB_PORT || 27022,
        user: process.env.MONGODB_USER || 'customer',
        password: process.env.MONGODB_PASSWORD || 'customer',
        name: process.env.MONGODB_NAME || 'customer',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        keyPrefix: process.env.REDIS_KEY_PREFIX || 'customer:',
        password: process.env.REDIS_PASSWORD || 'customer',
    },
    axios: {
        retryQtty: Number(process.env.AXIOS_RETRY_ATTEMPTS) || 1,
        baseDelay: Number(process.env.AXIOS_BASE_DELAY) || 1000,
        maxDelay: Number(process.env.AXIOS_MAX_DELAY) || 5000,
    },
    agentKeepAlive: {
        maxSockets: Number(process.env.AGENTKEEPALIVE_MAX_SOCKETS) || 200,
        maxFreeSockets: Number(process.env.AGENTKEEPALIVE_MAX_FREE_SOCKETS) || 20,
        timeout: Number(process.env.AGENTKEEPALIVE_TIMEOUT) || 60000,
        freeSocketTimeout: Number(process.env.AGENTKEEPALIVE_FREE_SOCKET_TIMEOUT) || 30000,
    },
    vitta: {
        baseUrl: process.env.VITTA_BASE_URL,
        grantType: process.env.VITTA_GRANT_TYPE,
        clientId: process.env.VITTA_CLIENT_ID,
        username: process.env.VITTA_USERNAME,
        password: process.env.VITTA_PASSWORD,
        scope: process.env.VITTA_SCOPE,
    },
};
