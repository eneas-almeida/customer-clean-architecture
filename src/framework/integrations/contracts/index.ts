import { VittaIntegrationInterface } from './vitta';
import { VtexIntegrationInterface } from './vtex';

export * from './vitta';
export * from './vtex';

export interface IntegrationInterface {
    vitta?: VittaIntegrationInterface;
    vtex?: VtexIntegrationInterface;
}
