import { CustomerRepositoryInterface, RepositoryInterface } from '@/domain/@shared/contracts';
import { Customer } from '@/domain/customer/entity/customer.entity';
import {
    PaymentProviderInterface,
    ProviderInterface,
    ShippingProviderInterface,
} from '@/infra/providers/@shared/contracts/provider';
import { CreateCustomerUseCase } from './create-customer.usecase';

const MockRepository = (): RepositoryInterface => {
    const customers = [
        new Customer(null, 202020, 'Tiago Campos'),
        new Customer(null, 202021, 'Marcos Santos'),
        new Customer(null, 202022, 'Cintia Mello'),
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
    const mockPaymentProvider: PaymentProviderInterface = {
        pay: jest.fn(async (amount) => {
            return 100 * amount;
        }),
    };

    const mockShippingProvider: ShippingProviderInterface = {
        calculate: jest.fn(async (amount) => {
            return 10 * amount;
        }),
    };

    return {
        payment: mockPaymentProvider,
        shipping: mockShippingProvider,
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
