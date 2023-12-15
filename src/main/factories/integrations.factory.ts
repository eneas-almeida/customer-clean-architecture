import { VittaIntegration } from '@/framework/integrations';
import { VittaIntegrationInterface, IntegrationsInterface } from '@/framework/integrations/contracts';
import { ServicesSingleton } from '../singletons';

export const MakeVittaIntegration = async (): Promise<VittaIntegrationInterface> => {
    const { httpClient } = await ServicesSingleton.getInstance();
    const vitta = new VittaIntegration(httpClient);
    return vitta;
};

export const MakeIntegrations = async (): Promise<IntegrationsInterface> => {
    const vitta = await MakeVittaIntegration();
    return { vitta };
};
