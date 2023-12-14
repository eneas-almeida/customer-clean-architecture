import { AxiosInstance } from 'axios';
import { envs } from '@/main/configs';
import { VittaIntegrationInterface, VittaIntegrationOutputDto } from './contracts';
import { toVittaIntegrationOutputDto } from './mappers/vitta-integration.mapper';

const RESOURCES = {
    GENERATE_TOKEN: '/auth/realms/careers/protocol/openid-connect/token',
};

export class VittaIntegration implements VittaIntegrationInterface {
    constructor(private readonly httpClient: AxiosInstance) {}

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

        const endpoint = baseUrl.concat(RESOURCES.GENERATE_TOKEN);

        const response = await this.httpClient.post(endpoint, body, configs);

        if (!response || !response.data) return null;

        return toVittaIntegrationOutputDto(response.data);
    }
}
