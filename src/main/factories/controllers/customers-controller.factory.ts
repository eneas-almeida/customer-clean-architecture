import {
    CustomersCreateInputDto,
    CustomersFindOneInputDto,
    CustomersUpdateInputDto,
    CustomersUseCaseInterface,
} from '@/application/contracts';
import { CustomersControllerInterface } from '@/presentation/contracts';
import { CustomersController } from '@/presentation/controllers/customers.controller';
import { MakeCustomersUsecase } from '../usecases/customers-usecase.factory';

export const MakeCustomersController = async (): Promise<CustomersControllerInterface> => {
    const { create, findOne, update } = MakeCustomersUsecase();

    const customerUseCasesAdapter: CustomersUseCaseInterface = {
        create: (input: CustomersCreateInputDto) => create.execute(input),
        findOne: (input: CustomersFindOneInputDto) => findOne.execute(input),
        update: (input: CustomersUpdateInputDto) => update.execute(input),
    };

    return new CustomersController(customerUseCasesAdapter);
};
