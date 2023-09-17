import { AxiosHttpClient } from '@/framework/clients/axios-http.client';
import { RepositoryInterface } from '@/domain/@shared/contracts';
import { CustomerMongodbRepository } from '@/infra/db/mongodb/repositories';
import { VittaIntegration, VtexIntegration } from '@/framework/integrations';
import { IntegrationInterface } from '@/framework/integrations/contracts';
import { IoRedisCacheProvider, JwtTokenProvider } from '@/framework/providers';
import { ProviderInterface } from '@/framework/providers/contracts';
import { CustomerControllerInterface } from '@/presentation/contracts';
import { CustomerController } from '@/presentation/controllers/customer.controller';
import { CreateCustomerUseCase, FindOneCustomerUseCase, UpdateCustomerUseCase } from '@/usecases/customer';

export const MakeCustomerController = async (): Promise<CustomerControllerInterface> => {
    const axiosInstance = new AxiosHttpClient().getInstance();

    const repository: RepositoryInterface = {
        customer: new CustomerMongodbRepository(),
    };

    const provider: ProviderInterface = {
        token: new JwtTokenProvider(),
        cache: new IoRedisCacheProvider(),
    };

    const integration: IntegrationInterface = {
        vtex: new VtexIntegration(axiosInstance),
        vitta: new VittaIntegration(axiosInstance),
    };

    const createCustomerUseCase = new CreateCustomerUseCase(repository, provider, integration);
    const updateCustomerUseCase = new UpdateCustomerUseCase(repository, provider, integration);
    const findOneCustomerUseCase = new FindOneCustomerUseCase(repository, integration);

    return new CustomerController(createCustomerUseCase, updateCustomerUseCase, findOneCustomerUseCase);
};
