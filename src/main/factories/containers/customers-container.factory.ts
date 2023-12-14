import { CustomersContainerInterface } from '@/application/contracts';
import {
    IntegrationsSingleton,
    ProvidersSingleton,
    RepositoriesSingleton,
    ServicesSingleton,
} from '@/main/singletons';

export const MakeCustomersContainer = async (): Promise<CustomersContainerInterface> => {
    const { vitta } = await IntegrationsSingleton.getInstance();
    const { token } = await ProvidersSingleton.getInstance();
    const { customers } = await RepositoriesSingleton.getInstance();
    const { cache, httpClient } = await ServicesSingleton.getInstance();

    return {
        integrations: {
            vitta,
        },
        providers: {
            token,
        },
        repositories: {
            customers,
        },
        services: {
            cache,
            httpClient,
        },
    };
};
