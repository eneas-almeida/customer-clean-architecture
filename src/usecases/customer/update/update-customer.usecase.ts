import { RepositoryInterface } from '@/domain/@shared/contracts';
import { IntegrationInterface } from '@/infra/integrations/contracts';
import { ProviderInterface } from '@/infra/providers/contracts';
import { AppError } from '@/main/errors';
import { CustomerMapper } from '@/main/mappers';
import { InputUpdateCustomerDto, OutputCustomerDto } from '@/usecases/contracts/customer';

export class UpdateCustomerUseCase {
    constructor(
        private readonly repository: RepositoryInterface,
        private readonly provider: ProviderInterface,
        private readonly integration: IntegrationInterface
    ) {}

    async execute(input: InputUpdateCustomerDto): Promise<OutputCustomerDto> {
        try {
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
        } catch (e) {
            throw e;
        }
    }
}
