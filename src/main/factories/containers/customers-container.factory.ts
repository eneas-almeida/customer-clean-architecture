import { CustomersContainerInterface } from '@/application/contracts';
import IntegrationsSingletonFactory from '../integrations-singleton.factory';
import ProvidersSingletonFactory from '../providers-singleton.factory';
import RepositoriesSingletonFactory from '../repositories-singleton.factory';

export const MakeCustomersContainer = (): CustomersContainerInterface => {
    const { customers } = RepositoriesSingletonFactory;
    const { vitta } = IntegrationsSingletonFactory;
    const { cache, token } = ProvidersSingletonFactory;

    return {
        repositories: {
            customers,
        },
        integrations: {
            vitta,
        },
        providers: {
            cache,
            token,
        },
    };
};
