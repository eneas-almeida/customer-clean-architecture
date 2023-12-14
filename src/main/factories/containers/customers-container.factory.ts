import { CustomersContainerInterface } from '@/application/contracts';
import { IntegrationsSingleton, ProvidersSingleton, RepositoriesSingleton } from '@/main/singletons';

export const MakeCustomersContainer = async (): Promise<CustomersContainerInterface> => {
    const { vitta } = await IntegrationsSingleton.getInstance();
    const { cache, token } = await ProvidersSingleton.getInstance();
    const { customers } = await RepositoriesSingleton.getInstance();

    return {
        integrations: {
            vitta,
        },
        providers: {
            cache,
            token,
        },
        repositories: {
            customers,
        },
    };
};
