import { CustomerRepositoryInterface, RepositoryInterface } from '@/domain/@shared/contracts';
import { CacheProviderInterface, ProviderInterface } from '@/infra/providers/@shared/contracts/provider';
import { UpdateCustomerUseCase } from './update-customer.usecase';
import { CustomerFactory } from '@/domain/customer/factory/customer.factory';
import { CreateCustomerUseCase } from '../create/create-customer.usecase';

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

    return {
        cache: mockCacheProvider,
    };
};

describe('Update Customer Unity', () => {
    test('Should return a customer unity', async () => {
        const createCustomerUseCase = new CreateCustomerUseCase(MockRepository(), MockProvider());

        const inputCreateCustomerDto = {
            id: '202020',
            document: 202020,
            name: 'Tiago Campos',
        };

        await createCustomerUseCase.execute(inputCreateCustomerDto);

        const updateCustomerUseCase = new UpdateCustomerUseCase(MockRepository(), MockProvider());

        const id = '202020';

        const inputUpdateCustomerDto = {
            document: 202020,
            name: 'Tiago de Freitas',
        };

        const output = await updateCustomerUseCase.execute(id, inputUpdateCustomerDto);

        expect(output.name).toEqual(inputUpdateCustomerDto.name);
    });
});
