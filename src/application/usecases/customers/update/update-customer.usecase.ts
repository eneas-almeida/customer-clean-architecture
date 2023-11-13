import { AppError } from '@/main/errors';
import {
    CustomersUpdateInputDto,
    CustomersOutputDto,
    CustomersCustomOutputDto,
} from '@/application/contracts/customers';
import { CustomersCommonsInterface } from '@/application/contracts';
import { customOutputDto } from '@/application/helpers';

export class UpdateCustomerUseCase {
    constructor(private readonly commons: CustomersCommonsInterface) {}

    async execute(input: CustomersUpdateInputDto): Promise<CustomersCustomOutputDto<CustomersOutputDto>> {
        let existsEntity = await this.commons.repositories.customer.findOneById(input.id);

        if (!existsEntity) {
            throw new AppError('customer not found', 204);
        }

        const existsAnotherEntity = await this.commons.repositories.customer.findOneByDocument(
            input.document
        );

        if (existsAnotherEntity && existsEntity.id !== existsAnotherEntity.id) {
            throw new AppError('customer already exists with document', 412);
        }

        existsEntity.setDocument(input.document);
        existsEntity.setName(input.name);
        existsEntity.validate();

        const output = await this.commons.repositories.customer.update(existsEntity);

        return customOutputDto(output);
    }
}
