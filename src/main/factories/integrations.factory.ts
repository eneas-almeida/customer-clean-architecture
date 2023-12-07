import { VittaIntegration } from '@/framework/integrations';
import { IntegrationInterface } from '@/framework/integrations/contracts';
import { AxiosHttpClient } from '@/infra/httpclients';

export const MakeIntegrations = (): IntegrationInterface => {
    const httpClient = new AxiosHttpClient().getInstance();

    return {
        vitta: new VittaIntegration(httpClient),
    };
};
