import { CustomersContainerInterface } from '@/application/contracts';
import { MakeIntegrations } from '../integrations.factory';
import { MakeProviders } from '../providers.factory';
import { MakeRepositories } from '../repositories.factory';

export const MakeCustomersContainer = (): CustomersContainerInterface => {
    const { customers } = MakeRepositories();
    const { vitta } = MakeIntegrations();
    const { cache, token } = MakeProviders();

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
