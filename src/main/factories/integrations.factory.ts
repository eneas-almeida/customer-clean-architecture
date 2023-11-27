import { VittaIntegration } from '@/framework/integrations';
import { AxiosHttpClient } from '@/infra/httpclients';

export const MakeIntegrations = () => {
    const httpClient = new AxiosHttpClient().getInstance();

    return {
        vitta: new VittaIntegration(httpClient),
    };
};
