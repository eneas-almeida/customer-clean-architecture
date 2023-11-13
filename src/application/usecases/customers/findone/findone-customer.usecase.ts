import {
    CustomersCommonsInterface,
    CustomersCustomOutputDto,
    CustomersFindOneInputDto,
    CustomersOutputDto,
} from '@/application/contracts/customers';
import { customOutputDto } from '@/application/helpers';

export class FindOneCustomerUseCase {
    constructor(private readonly commons: CustomersCommonsInterface) {}

    async execute(input: CustomersFindOneInputDto): Promise<CustomersCustomOutputDto<CustomersOutputDto>> {
        const output = await this.commons.repositories.customer.findOneById(input.id);

        return customOutputDto(output);
    }
}
