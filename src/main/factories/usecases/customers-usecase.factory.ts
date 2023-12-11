import {
    CreateCustomerUseCase,
    FindOneCustomerUseCase,
    UpdateCustomerUseCase,
} from '@/application/usecases/customers';
import { MakeCustomersContainer } from '../containers/customers-container.factory';

export const MakeCustomersUseCase = () => {
    const customersContainer = MakeCustomersContainer();

    return {
        create: new CreateCustomerUseCase(customersContainer),
        update: new UpdateCustomerUseCase(customersContainer),
        findOne: new FindOneCustomerUseCase(customersContainer),
    };
};
