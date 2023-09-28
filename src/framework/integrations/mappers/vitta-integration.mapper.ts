import { VittaIntegrationOutputDto } from '../contracts';

export const toVittaIntegrationOutputDto = (data: any): VittaIntegrationOutputDto => ({
    grantType: data.grant_type,
    clientId: data.client_id,
    clientSecret: data.client_secret,
    username: data.username,
    password: data.password,
    scope: data.scope,
});
