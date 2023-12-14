import { CustomersContainerInterface, CustomersRepositoryInterface } from '@/application/contracts';
import { VittaIntegrationInterface } from '@/framework/integrations/contracts';
import { CacheServiceInterface } from '@/infra/services/cache/contracts';
import { TokenProviderInterface } from '@/framework/providers/token/contracts';
import { CreateCustomerUseCase } from './create-customer.usecase';

const input = {
    id: '202020',
    document: 202020,
    name: 'Tiago Campos',
};

/* Repositories */

const MockCustomersRepository = (): CustomersRepositoryInterface => ({
    create: jest.fn().mockReturnValue(Promise.resolve(input)),
    update: jest.fn(),
    findOneById: jest.fn(),
    findOneByDocument: jest.fn(),
});

/* Services */

const MockCacheService = (): CacheServiceInterface => ({
    save: jest.fn(async (value, timeToExpires) => null),
    findByKey: jest.fn(async (key) => null),
    invalidate: jest.fn(async (key) => null),
    clearAllCacheByPrefix: jest.fn(async (prefix) => null),
});

/* Providers */

const MockTokenProvider = (): TokenProviderInterface => ({
    generateToken: jest.fn(async () => null),
});

/* Integrations */

const MockVittaIntegration = (): VittaIntegrationInterface => ({
    getAccessToken: jest.fn(async () => null),
});

/* Commons */

const MockCommons = (): CustomersContainerInterface => ({
    repositories: {
        customers: MockCustomersRepository(),
    },
    integrations: {
        vitta: MockVittaIntegration(),
    },
    providers: {
        token: MockTokenProvider(),
    },
});

/* Tests */

describe('Create Customer Unity', () => {
    test('Should return a customer unity', async () => {
        const createCustomerUseCase = new CreateCustomerUseCase(MockCommons());

        const output = await createCustomerUseCase.execute(input);

        expect(output.data.name).toEqual(input.name);
    });
});
