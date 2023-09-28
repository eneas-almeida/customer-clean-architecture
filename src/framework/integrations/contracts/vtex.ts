export interface VtexIntegrationOutputDto {}

export interface VtexIntegrationInterface {
    getUser(): Promise<VtexIntegrationOutputDto | null>;
}
