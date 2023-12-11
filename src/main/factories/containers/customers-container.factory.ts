import { CustomersContainerInterface } from '@/application/contracts';
import { IntegartionsSingletonFactory, ProvidersSingletonFactory, RepositoriesSingletonFactory } from '../';

export const MakeCustomersContainer = async (): Promise<CustomersContainerInterface> => {
    const { vitta } = await IntegartionsSingletonFactory.getInstance();
    const { cache, token } = await ProvidersSingletonFactory.getInstance();
    const { customers } = await RepositoriesSingletonFactory.getInstance();

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
