import { CustomersContainerInterface, CustomersRepositoryInterface } from '@/application/contracts';
import { VittaIntegrationInterface } from '@/framework/integrations/contracts';
import { CacheProviderInterface, TokenProviderInterface } from '@/framework/providers/contracts';
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

/* Providers */

const MockCacheProvider = (): CacheProviderInterface => ({
    save: jest.fn(async (value, timeToExpires) => null),
    findByKey: jest.fn(async (key) => null),
    invalidate: jest.fn(async (key) => null),
    clearAllCacheByPrefix: jest.fn(async (prefix) => null),
});

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
        cache: MockCacheProvider(),
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
