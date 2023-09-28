import { AxiosInstance } from 'axios';
import { VtexIntegrationInterface, VtexIntegrationOutputDto } from './contracts';

export class VtexIntegration implements VtexIntegrationInterface {
    private readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async getUser(): Promise<VtexIntegrationOutputDto | null> {
        return null;
    }
}
