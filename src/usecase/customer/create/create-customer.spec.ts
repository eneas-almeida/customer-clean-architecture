import { CustomerRepositoryInterface, RepositoryInterface } from '@/domain/@shared/contracts';
import {
    CacheProviderInterface,
    ProviderInterface,
    TokenProviderInterface,
} from '@/infra/providers/@shared/contracts/provider';
import { CreateCustomerUseCase } from './create-customer.usecase';
import { CustomerFactory } from '@/domain/customer/factory/customer.factory';

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

    const mockTokenProvider: TokenProviderInterface = {
        generateToken: jest.fn(async () => null),
    };

    return {
        token: mockTokenProvider,
        cache: mockCacheProvider,
    };
};

describe('Create Customer Unity', () => {
    test('Should return a customer unity', async () => {
        const createCustomerUseCase = new CreateCustomerUseCase(MockRepository(), MockProvider());

        const input = {
            id: '202020',
            document: 202020,
            name: 'Tiago Campos',
        };

        const output = await createCustomerUseCase.execute(input);

        expect(output.name).toEqual(input.name);
    });
});
