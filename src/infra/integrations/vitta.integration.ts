import { AxiosInstance } from 'axios';
import { envs } from '@/main/configs';
import { OutputTokenDto } from '../providers/contracts';
import { VittaIntegrationInterface } from './contracts';

const ENDPOINTS = {
    generateToken: '/auth/realms/careers/protocol/openid-connect/token',
};

export class VittaIntegration implements VittaIntegrationInterface {
    private readonly httpsClient: AxiosInstance;

    constructor(httpsClient: AxiosInstance) {
        this.httpsClient = httpsClient;
    }

    async getAccessToken(): Promise<OutputTokenDto | null> {
        const { baseUrl, grantType, clientId, username, password, scope } = envs.vitta;

        const body = {
            grant_type: grantType,
            client_id: clientId,
            client_secret: envs.api.tokenSecret,
            username,
            password,
            scope,
        };

        const configs = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const endpoint = `${baseUrl}${ENDPOINTS.generateToken}`;

        try {
            const response = await this.httpsClient.post(endpoint, body, configs);
            return response?.data as OutputTokenDto;
        } catch (e) {
            throw e;
        }
    }
}
