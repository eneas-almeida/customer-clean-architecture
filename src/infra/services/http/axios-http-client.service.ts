import axios, { AxiosInstance } from 'axios';
import AgentKeepAlive from 'agentkeepalive';
import axiosRetry from 'axios-retry';
import { envs } from '@/main/configs';

export class AxiosHttpClientService {
    async getInstance(): Promise<AxiosInstance> {
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
            retryDelay: axiosRetry.exponentialDelay,
            retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
        });

        return axiosInstance;
    }
}
