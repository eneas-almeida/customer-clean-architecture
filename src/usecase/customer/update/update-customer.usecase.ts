import { RepositoryInterface } from '@/domain/@shared/contracts';
import { AppError } from '@/domain/@shared/errors';
import { IntegrationInterface } from '@/infra/integrations/contracts';
import { ProviderInterface } from '@/infra/providers/contracts';
import { CustomerMapper } from '@/main/mappers';
import { InputUpdateCustomerDto, OutputCustomerDto } from '../../contracts/customer';

export class UpdateCustomerUseCase {
    constructor(
        private readonly repository: RepositoryInterface,
        private readonly provider: ProviderInterface,
        private readonly integration: IntegrationInterface
    ) {}

    async execute(id: string, input: InputUpdateCustomerDto): Promise<OutputCustomerDto> {
        try {
            const existsEntity = await this.repository.customer.findOneById(id);

            if (!existsEntity) {
                throw new AppError('cliente não encontrado', 204);
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
