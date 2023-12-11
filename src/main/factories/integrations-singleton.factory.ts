import { VittaIntegration } from '@/framework/integrations';
import { VittaIntegrationInterface } from '@/framework/integrations/contracts';
import { AxiosHttpClient } from '@/infra/httpclients';

export class IntegartionsSingletonFactory {
    private static instance: Promise<IntegartionsSingletonFactory> | null;

    private constructor(public readonly vitta: VittaIntegrationInterface) {}

    public static async getInstance(): Promise<IntegartionsSingletonFactory> {
        if (!IntegartionsSingletonFactory.instance) {
            const httpClient = new AxiosHttpClient().getInstance();
            const vitta = new VittaIntegration(httpClient);

            return new IntegartionsSingletonFactory(vitta);
        }

        return IntegartionsSingletonFactory.instance;
    }
}
