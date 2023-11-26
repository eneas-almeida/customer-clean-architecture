import { VittaIntegrationInterface } from '@/framework/integrations/contracts';
import { CacheProviderInterface, TokenProviderInterface } from '@/framework/providers/contracts';
import { CreateCustomerUseCase } from './create-customer.usecase';
import { CustomersCommonsInterface, CustomersRepositoryInterface } from '@/application/contracts';

const input = {
    body: {
        name: 'Tiago Campos',
    },
};

/* Repositories */

const MockCustomersRepository = (): CustomersRepositoryInterface => ({
    create: jest.fn().mockReturnValue(Promise.resolve(input.body)),
    update: jest.fn(),
    findOneById: jest.fn(),
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

const MockCommons = (): CustomersCommonsInterface => ({
    repositories: {
        customer: MockCustomersRepository(),
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

describe('Create Customer Unity', () => {
    test('Should return a customer unity', async () => {
        const createCustomerUseCase = new CreateCustomerUseCase(MockCommons());

        const input = {
            device: 'mobile',
            id: '202020',
            document: 202020,
            name: 'Tiago Campos',
        };

        const output = await createCustomerUseCase.execute(input);

        expect(output.data.name).toEqual(input.name);
    });
});
