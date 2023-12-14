import { AxiosInstance } from 'axios';
import { CognitoIntegrationInterface, CognitoIntegrationOutputDto } from './contracts/cognito';

export class CognitoIntegration implements CognitoIntegrationInterface {
    constructor(private readonly httpClient: AxiosInstance) {}

    getToken(): Promise<CognitoIntegrationOutputDto> {
        throw new Error('Method not implemented.');
    }

    validate(token: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
