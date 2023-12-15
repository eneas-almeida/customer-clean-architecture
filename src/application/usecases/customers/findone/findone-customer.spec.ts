import { CustomersContainerInterface, CustomersRepositoryInterface } from '@/application/contracts';
import { VittaIntegrationInterface } from '@/framework/integrations/contracts';
import { TokenProviderInterface } from '@/framework/providers/token/contracts';
import { CacheServiceInterface } from '@/infra/services/cache/contracts';
import { FindOneCustomerUseCase } from './findone-customer.usecase';

const input = {
    id: '202020',
    document: 202020,
    name: 'Tiago Campos',
};

/* Repositories */

const MockCustomersRepository = (): CustomersRepositoryInterface => ({
    create: jest.fn(),
    update: jest.fn(),
    findOneById: jest.fn().mockResolvedValue(input),
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
    generate: jest.fn(async () => null),
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

describe('FindOne Customer Unity', () => {
    test('Should return a customer unity', async () => {
        const mockCommons = MockCommons();

        const findOneCustomerUseCase = new FindOneCustomerUseCase(mockCommons);

        const output = await findOneCustomerUseCase.execute({ id: input.id });

        expect(output.data.name).toEqual(input.name);
    });
});
