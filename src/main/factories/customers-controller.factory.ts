import { VittaIntegration, VtexIntegration } from '@/framework/integrations';
import { IoRedisCacheProvider, JwtTokenProvider } from '@/framework/providers';
import { CustomersMongodbRepository } from '@/infra/db/mongodb/repositories';
import { AxiosHttpClient } from '@/infra/httpclients';
import { CustomersControllerInterface } from '@/presentation/contracts';
import { CustomersController } from '@/presentation/controllers/customers.controller';
import {
    CreateCustomerUseCase,
    FindOneCustomerUseCase,
    UpdateCustomerUseCase,
} from '@/application/usecases/customers';
import {
    CustomersCommonsInterface,
    CustomersCreateInputDto,
    CustomersFindOneInputDto,
    CustomersUpdateInputDto,
    CustomersUseCaseInterface,
} from '@/application/contracts';

export const MakeCustomerControllerContainer = async (): Promise<CustomersControllerInterface> => {
    const axiosInstance = new AxiosHttpClient().getInstance();

    const commons: CustomersCommonsInterface = {
        repositories: {
            customer: new CustomersMongodbRepository(),
        },
        integrations: {
            vtex: new VtexIntegration(axiosInstance),
            vitta: new VittaIntegration(axiosInstance),
        },
        providers: {
            token: new JwtTokenProvider(),
            cache: new IoRedisCacheProvider(),
        },
    };

    const createCustomerUseCase = new CreateCustomerUseCase(commons);
    const updateCustomerUseCase = new UpdateCustomerUseCase(commons);
    const findOneCustomerUseCase = new FindOneCustomerUseCase(commons);

    const customerUseCasesAdapter: CustomersUseCaseInterface = {
        create: (input: CustomersCreateInputDto) => createCustomerUseCase.execute(input),
        findOne: (input: CustomersFindOneInputDto) => findOneCustomerUseCase.execute(input),
        update: (input: CustomersUpdateInputDto) => updateCustomerUseCase.execute(input),
    };

    return new CustomersController(customerUseCasesAdapter);
};
