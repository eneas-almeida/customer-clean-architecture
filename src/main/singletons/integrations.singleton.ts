import { VittaIntegrationInterface } from '@/framework/integrations/contracts';
import { MakeIntegrations } from '../factories';

export class IntegrationsSingleton {
    private static instance: Promise<IntegrationsSingleton> | null;

    private constructor(public readonly vitta: VittaIntegrationInterface) {}

    public static async getInstance(): Promise<IntegrationsSingleton> {
        if (!IntegrationsSingleton.instance) {
            const { vitta } = await MakeIntegrations();

            return new IntegrationsSingleton(vitta);
        }

        return IntegrationsSingleton.instance;
    }
}
