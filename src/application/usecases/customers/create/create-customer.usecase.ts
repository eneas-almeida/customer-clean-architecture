import {
    CustomersContainerInterface,
    CustomersCreateInputDto,
    CustomersCustomOutputDto,
    CustomersOutputDto,
} from '@/application/contracts/customers';
import { customersCustomOutputDto } from '@/application/helpers';
import { CustomersMapper } from '@/application/mappers';
import { AppError } from '@/main/errors';

export class CreateCustomerUseCase {
    constructor(public readonly container: CustomersContainerInterface) {}

    async execute(input: CustomersCreateInputDto): Promise<CustomersCustomOutputDto<CustomersOutputDto>> {
        const existsEntity = await this.container.repositories.customers.findOneByDocument(input.document);

        if (existsEntity) {
            throw new AppError('customer already exists with document', 412);
        }

        let entity = CustomersMapper.dtoToEntity(input);

        entity = await this.container.repositories.customers.create(entity);

        const output = customersCustomOutputDto(entity);

        return output;
    }
}
