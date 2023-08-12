import { CustomerRepositoryInterface, RepositoryInterface } from '@/domain/@shared/contracts';
import {
    CacheProviderInterface,
    ProviderInterface,
    TokenProviderInterface,
} from '@/infra/providers/@shared/contracts/provider';
import { CreateCustomerUseCase } from '../create/create-customer.usecase';
import { FindOneCustomerUseCase } from './findone-customer.usecase';
import { CustomerFactory } from '@/domain/customer/factory/customer.factory';

const MockRepository = (): RepositoryInterface => {
    const customers = [
        CustomerFactory.create(202020, 'Tiago Campos'),
        CustomerFactory.create(202021, 'Marcos Santos'),
        CustomerFactory.create(202022, 'Cintia Mello'),
    ];

    const mockCustomerRepository: CustomerRepositoryInterface = {
        create: jest.fn().mockReturnValue(Promise.resolve(customers[1])),
        update: jest.fn().mockReturnValue(Promise.resolve(customers[1])),
        findOneById: jest.fn().mockReturnValue(Promise.resolve(customers[1])),
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

describe('FindOne Customer Unity', () => {
    test('Should return a customer unity', async () => {
        const mockRepository = MockRepository();

        const createCustomerUseCase = new CreateCustomerUseCase(mockRepository, MockProvider());
        const findOneCustomerUseCase = new FindOneCustomerUseCase(mockRepository);

        const input = {
            id: '0x0230x100',
            document: 111111,
            name: 'Marcos Santos',
        };

        await createCustomerUseCase.execute(input);

        const output = await findOneCustomerUseCase.execute({ id: input.id });

        expect(output.name).toEqual(input.name);
    });
});
