import { CustomerRepositoryInterface, RepositoryInterface } from '@/domain/@shared/contracts';
import { CustomerFactory } from '@/domain/customer/factory/customer.factory';
import {
    IntegrationInterface,
    VittaIntegrationInterface,
    VtexIntegrationInterface,
} from '@/framework/integrations/contracts';
import { CacheProviderInterface, ProviderInterface } from '@/framework/providers/contracts';
import { CreateCustomerUseCase } from './create-customer.usecase';

const MockRepository = (): RepositoryInterface => {
    const customers = [
        CustomerFactory.create(202020, 'Tiago Campos'),
        CustomerFactory.create(202021, 'Marcos Santos'),
        CustomerFactory.create(202022, 'Cintia Mello'),
    ];

    const mockCustomerRepository: CustomerRepositoryInterface = {
        create: jest.fn().mockReturnValue(Promise.resolve(customers[0])),
        update: jest.fn().mockReturnValue(Promise.resolve(customers[0])),
        findOneById: jest.fn().mockReturnValue(Promise.resolve(customers[0])),
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

describe('Create Customer Unity', () => {
    test('Should return a customer unity', async () => {
        const createCustomerUseCase = new CreateCustomerUseCase(
            MockRepository(),
            MockProvider(),
            MockIntegration()
        );

        const input = {
            device: 'mobile',
            id: '202020',
            document: 202020,
            name: 'Tiago Campos',
        };

        const output = await createCustomerUseCase.execute(input);

        expect(output.name).toEqual(input.name);
    });
});
