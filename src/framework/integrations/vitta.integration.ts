import { AxiosInstance } from 'axios';
import { envs } from '@/main/configs';
import { VittaIntegrationInterface, VittaIntegrationOutputDto } from './contracts';
import { toVittaIntegrationOutputDto } from './mappers/vitta-integration.mapper';

const ENDPOINTS = {
    generateToken: '/auth/realms/careers/protocol/openid-connect/token',
};

export class VittaIntegration implements VittaIntegrationInterface {
    private readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async getAccessToken(): Promise<VittaIntegrationOutputDto | null> {
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
            const { data } = await this.axios.post(endpoint, body, configs);
            return data ? toVittaIntegrationOutputDto(data) : null;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
