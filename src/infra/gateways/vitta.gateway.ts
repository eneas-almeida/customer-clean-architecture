import { AxiosInstance } from 'axios';
import { envs } from '@/main/configs';

const ENDPOINTS = {
    generateToken: '/auth/realms/careers/protocol/openid-connect/token',
};

export interface OutputVittaTokenDto {
    access_token: string;
    expires_in: number;
    refresh_expires: number;
    token_type: string;
    'not-before-policy': number;
    scope: string;
    id_token: string;
}

export class VittaGateway {
    private readonly httpsClient: AxiosInstance;

    constructor(httpsClient?: AxiosInstance) {
        this.httpsClient = httpsClient;
    }

    async getAccessToken(): Promise<OutputVittaTokenDto | null> {
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
            return response?.data as OutputVittaTokenDto;
        } catch (e) {
            throw e;
        }
    }
}
