import {
    CustomersCreateInputDto,
    CustomersFindOneInputDto,
    CustomersUpdateInputDto,
} from '@/application/contracts';
import { MakeCustomersUseCase } from '@/main/factories/usecases/customers-usecase.factory';

export const CustomersUseCaseAdapter = () => {
    const { create, findOne, update, container } = MakeCustomersUseCase();

    return {
        create: (input: CustomersCreateInputDto) => create.execute(input),
        findOne: (input: CustomersFindOneInputDto) => findOne.execute(input),
        update: (input: CustomersUpdateInputDto) => update.execute(input),
        container,
    };
};
