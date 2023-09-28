export interface VittaIntegrationOutputDto {
    grantType: string;
    clientId: string;
    clientSecret: string;
    username: string;
    password: string;
    scope: string;
}

export interface VittaIntegrationInterface {
    getAccessToken(): Promise<VittaIntegrationOutputDto | null>;
}
