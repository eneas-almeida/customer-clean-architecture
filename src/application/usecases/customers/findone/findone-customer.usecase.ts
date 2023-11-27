import {
    CustomersContainerInterface,
    CustomersCustomOutputDto,
    CustomersFindOneInputDto,
    CustomersOutputDto,
} from '@/application/contracts/customers';
import { customersCustomOutputDto } from '@/application/helpers';

export class FindOneCustomerUseCase {
    constructor(private readonly container: CustomersContainerInterface) {}

    async execute(input: CustomersFindOneInputDto): Promise<CustomersCustomOutputDto<CustomersOutputDto>> {
        const output = await this.container.repositories.customers.findOneById(input.id);

        return customersCustomOutputDto(output);
    }
}
