import { CustomerRepositoryInterface, RepositoryInterface } from '@/domain/@shared/contracts';
import { Customer } from '@/domain/customer/entity/customer.entity';
import {
    PaymentProviderInterface,
    ProviderInterface,
    ShippingProviderInterface,
} from '@/infra/providers/@shared/contracts/provider';
import { CreateCustomerUseCase } from '../create/create-customer.usecase';
import { FindOneCustomerUseCase } from './findone-customer.usecase';

const MockRepository = (): RepositoryInterface => {
    const customers = [
        new Customer(null, 101010, 'Tiago Rizzo'),
        new Customer(null, 111111, 'Marcos Santos'),
        new Customer(null, 121212, 'Nelson Avilla'),
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
    const mockPaymentProvider: PaymentProviderInterface = {
        pay: jest.fn(async (amount) => {
            return 100 * amount;
        }),
    };

    const mockShippingProvider: ShippingProviderInterface = {
        calculate: jest.fn(async (amount) => {
            return 100 * amount;
        }),
    };

    return {
        payment: mockPaymentProvider,
        shipping: mockShippingProvider,
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
