import { VittaIntegration } from '@/framework/integrations';
import { IntegrationsInterface, VittaIntegrationInterface } from '@/framework/integrations/contracts';
import { AxiosHttpClient } from '@/infra/httpclients';

export const MakeVittaIntegration = async (): Promise<VittaIntegrationInterface> => {
    const httpClient = new AxiosHttpClient().getInstance();
    const vitta = new VittaIntegration(httpClient);
    return vitta;
};

export const MakeIntegrations = async (): Promise<IntegrationsInterface> => {
    const vitta = await MakeVittaIntegration();
    return { vitta };
};
