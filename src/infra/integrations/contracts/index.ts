export interface OutputVittaDto {}

export interface OutputVtexDto {}

export interface VittaIntegrationInterface {
    getAccessToken(): Promise<OutputVittaDto>;
}

export interface VtexIntegrationInterface {
    getUser(): Promise<OutputVtexDto>;
    createUser(): Promise<OutputVtexDto>;
}

export interface IntegrationInterface {
    vitta?: VittaIntegrationInterface;
    vtex?: VtexIntegrationInterface;
}
