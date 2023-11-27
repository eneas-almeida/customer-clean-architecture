import {
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    FindOneCustomerUseCase,
} from '@/application/usecases/customers';
import { MakeCustomersContainer } from '../containers/customers-container.factory';

export const MakeCustomersUsecase = () => {
    const customersContainer = MakeCustomersContainer();

    return {
        create: new CreateCustomerUseCase(customersContainer),
        update: new UpdateCustomerUseCase(customersContainer),
        findOne: new FindOneCustomerUseCase(customersContainer),
    };
};
