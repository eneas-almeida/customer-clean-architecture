import { AxiosInstance } from 'axios';
import { envs } from '@/main/configs';

const ENDPOINTS = {
    generateToken: '/auth/realms/careers/protocol/openid-connect/token',
};

export class VittaGateway {
    private readonly httpsClient: AxiosInstance;

    constructor(httpsClient?: AxiosInstance) {
        this.httpsClient = httpsClient;
    }

    async getAccessToken(): Promise<string | null> {
        const { baseUrl, grantType, clientId, clientSecret, username, password, scope } = envs.vitta;

        const body = {
            grant_type: grantType,
            client_id: clientId,
            client_secret: clientSecret,
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
            return response?.data?.access_token;
        } catch (e) {
            throw e;
        }
    }
}
