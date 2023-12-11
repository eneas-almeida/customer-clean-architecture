import { VittaIntegration } from '@/framework/integrations';
import { VittaIntegrationInterface } from '@/framework/integrations/contracts';
import { AxiosHttpClient } from '@/infra/httpclients';

class IntegartionsSingletonFactory {
    public vitta: VittaIntegrationInterface;

    constructor() {
        this.make();
    }

    make() {
        const httpClient = new AxiosHttpClient().getInstance();
        this.vitta = new VittaIntegration(httpClient);
    }
}

export default new IntegartionsSingletonFactory();
