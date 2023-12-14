export interface VittaIntegrationOutputDto {
    access_token: string;
    expires_in: number;
    refresh_expires: number;
    token_type: string;
    'not-before-policy': number;
    scope: string;
    id_token: string;
}

export interface VittaIntegrationInterface {
    getToken(): Promise<VittaIntegrationOutputDto | null>;
    validate(token: string): Promise<boolean>;
}
