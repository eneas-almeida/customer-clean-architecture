import { AppError } from '@/main/errors';
import {
    CustomersUpdateInputDto,
    CustomersOutputDto,
    CustomersCustomOutputDto,
} from '@/application/contracts/customers';
import { CustomersContainerInterface } from '@/application/contracts';
import { customersCustomOutputDto } from '@/application/helpers';

export class UpdateCustomerUseCase {
    constructor(private readonly container: CustomersContainerInterface) {}

    async execute(input: CustomersUpdateInputDto): Promise<CustomersCustomOutputDto<CustomersOutputDto>> {
        let existsEntity = await this.container.repositories.customers.findOneById(input.id);

        if (!existsEntity) {
            throw new AppError('customer not found', 204);
        }

        const existsAnotherEntity = await this.container.repositories.customers.findOneByDocument(
            input.document
        );

        if (existsAnotherEntity && existsEntity.id !== existsAnotherEntity.id) {
            throw new AppError('customer already exists with document', 412);
        }

        existsEntity.setDocument(input.document);
        existsEntity.setName(input.name);
        existsEntity.validate();

        const output = await this.container.repositories.customers.update(existsEntity);

        return customersCustomOutputDto(output);
    }
}
