import { CustomersRepositoryInterface, RepositoryInterface } from '@/domain/@shared/contracts';
import { CustomersFactory } from '@/domain/customers/factory/customers.factory';
import {
    IntegrationInterface,
    VittaIntegrationInterface,
    VtexIntegrationInterface,
} from '@/framework/integrations/contracts';
import { CacheProviderInterface, ProviderInterface } from '@/framework/providers/contracts';
import { CreateCustomerUseCase } from '../create/create-customer.usecase';
import { FindOneCustomerUseCase } from './findone-customer.usecase';

const MockRepository = (): RepositoryInterface => {
    const customers = [
        CustomersFactory.create(202020, 'Tiago Campos'),
        CustomersFactory.create(202021, 'Marcos Santos'),
        CustomersFactory.create(202022, 'Cintia Mello'),
    ];

    const mockCustomerRepository: CustomersRepositoryInterface = {
        create: jest.fn().mockReturnValue(Promise.resolve(customers[1])),
        update: jest.fn().mockReturnValue(Promise.resolve(customers[1])),
        findOneById: jest.fn().mockReturnValue(Promise.resolve(customers[1])),
        findOneByDocument: jest.fn().mockReturnValue(Promise.resolve(customers[1])),
    };

    return {
        customer: mockCustomerRepository,
    };
};

const MockProvider = (): ProviderInterface => {
    const mockCacheProvider: CacheProviderInterface = {
        save: jest.fn(async (value, timeToExpires) => null),
        findByKey: jest.fn(async (key) => null),
        invalidate: jest.fn(async (key) => null),
        clearAllCacheByPrefix: jest.fn(async (prefix) => null),
    };

    return {
        cache: mockCacheProvider,
    };
};

const MockIntegration = (): IntegrationInterface => {
    const mockVittaIntegration: VittaIntegrationInterface = {
        getAccessToken: jest.fn(async () => null),
    };

    const mockVtexIntegration: VtexIntegrationInterface = {
        getUser: jest.fn(async () => null),
    };

    return {
        vitta: mockVittaIntegration,
        vtex: mockVtexIntegration,
    };
};

describe('FindOne Customer Unity', () => {
    test('Should return a customer unity', async () => {
        const mockRepository = MockRepository();

        const createCustomerUseCase = new CreateCustomerUseCase(
            mockRepository,
            MockProvider(),
            MockIntegration()
        );

        const findOneCustomerUseCase = new FindOneCustomerUseCase(mockRepository, MockIntegration());

        const input = {
            device: 'mobile',
            id: '0x0230x100',
            document: 111111,
            name: 'Marcos Santos',
        };

        await createCustomerUseCase.execute(input);

        const output = await findOneCustomerUseCase.execute(input);

        expect(output.name).toEqual(input.name);
    });
});
