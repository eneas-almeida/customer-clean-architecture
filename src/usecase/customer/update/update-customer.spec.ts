import { CustomerRepositoryInterface, RepositoryInterface } from '@/domain/@shared/contracts';
import { Customer } from '@/domain/customer/entity/customer.entity';
import {
    PaymentProviderInterface,
    ProviderInterface,
    ShippingProviderInterface,
} from '@/infra/providers/@shared/contracts/provider';
import { CreateCustomerUseCase } from '../create';
import { UpdateCustomerUseCase } from './update-customer.usecase';

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
