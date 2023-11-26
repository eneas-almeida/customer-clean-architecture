import { CustomersMapper } from '@/application/mappers';
import { AppError } from '@/main/errors';
import {
    CustomersCommonsInterface,
    CustomersCreateInputDto,
    CustomersCustomOutputDto,
    CustomersOutputDto,
} from '@/application/contracts/customers';
import { customersCustomOutputDto } from '@/application/helpers';

export class CreateCustomerUseCase {
    constructor(private readonly commons: CustomersCommonsInterface) {}

    async execute(input: CustomersCreateInputDto): Promise<CustomersCustomOutputDto<CustomersOutputDto>> {
        const existsEntity = await this.commons.repositories.customer.findOneByDocument(input.document);

        if (existsEntity) {
            throw new AppError('customer already exists with document', 412);
        }

        let output = CustomersMapper.dtoToEntity(input);

        output = await this.commons.repositories.customer.create(output);

        return customersCustomOutputDto(output);
    }
}
