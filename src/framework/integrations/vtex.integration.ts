import { AxiosInstance } from 'axios';
import { OutputVtexDto, VtexIntegrationInterface } from './contracts';

export class VtexIntegration implements VtexIntegrationInterface {
    private readonly httpsClient: AxiosInstance;

    constructor(httpsClient: AxiosInstance) {
        this.httpsClient = httpsClient;
    }

    async getUser(): Promise<OutputVtexDto> {
        throw new Error('Method not implemented.');
    }

    async createUser(): Promise<OutputVtexDto> {
        throw new Error('Method not implemented.');
    }
}
