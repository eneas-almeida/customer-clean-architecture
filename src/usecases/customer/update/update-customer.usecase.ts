import { CustomerMapper } from '@/data/mappers';
import { RepositoryInterface } from '@/domain/@shared/contracts';
import { IntegrationInterface } from '@/framework/integrations/contracts';
import { ProviderInterface } from '@/framework/providers/contracts';
import { AppError } from '@/main/errors';
import { CustomerUpdateInputDto, CustomerOutputDto } from '@/usecases/contracts/customer';

export class UpdateCustomerUseCase {
    constructor(
        private readonly repository: RepositoryInterface,
        private readonly provider: ProviderInterface,
        private readonly integration: IntegrationInterface
    ) {}

    async execute(input: CustomerUpdateInputDto): Promise<CustomerOutputDto> {
        let existsEntity = await this.repository.customer.findOneById(input.id);

        if (!existsEntity) {
            throw new AppError('customer not found', 204);
        }

        const existsAnotherEntity = await this.repository.customer.findOneByDocument(input.document);

        if (existsAnotherEntity && existsEntity.id !== existsAnotherEntity.id) {
            throw new AppError('customer already exists with document', 412);
        }

        existsEntity.setDocument(input.document);
        existsEntity.setName(input.name);
        existsEntity.validate();

        const entity = await this.repository.customer.update(existsEntity);

        return CustomerMapper.entityToDto(entity);
    }
}
