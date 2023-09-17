import AgentKeepAlive from 'agentkeepalive';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { envs } from '../main/configs';

export class AxiosHttpClient {
    getInstance(): AxiosInstance {
        const { maxSockets, maxFreeSockets, timeout, freeSocketTimeout } = envs.agentKeepAlive;

        const axiosInstance = axios.create({
            httpAgent: new AgentKeepAlive({
                maxSockets,
                maxFreeSockets,
                timeout,
                freeSocketTimeout,
            }),
        });

        axiosRetry(axiosInstance, {
            retries: envs.axios.retryQtty,
            retryDelay: this.exponentialBackoff,
            retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
        });

        return axiosInstance;
    }

    private exponentialBackoff(retryAttemps: number) {
        const { baseDelay, maxDelay } = envs.axios;
        return Math.min(baseDelay * 2 ** retryAttemps, maxDelay);
    }
}
