import { customersUseCaseAdapter } from '@/main/adapters/usecases/customers-usecase.adapter';
import { CustomersControllerInterface } from '@/presentation/contracts';
import { CustomersController } from '@/presentation/controllers/customers.controller';

export const MakeCustomersController = (): CustomersControllerInterface => {
    return new CustomersController(customersUseCaseAdapter());
};
