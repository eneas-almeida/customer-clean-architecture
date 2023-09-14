import { RepositoryInterface } from '@/domain/@shared/contracts';
import { AppError } from '@/domain/@shared/errors';
import { CustomerMapper } from '@/main/mappers';
import { InputFindOneCustomerDto, OutputCustomerDto } from '../../contracts/customer';
import { ProviderInterface } from '@/infra/providers/contracts';
import { IntegrationInterface } from '@/infra/integrations/contracts';

export class FindOneCustomerUseCase {
    constructor(
        private readonly repository: RepositoryInterface,
        private readonly integration: IntegrationInterface
    ) {}

    async execute(input: InputFindOneCustomerDto): Promise<OutputCustomerDto> {
        try {
            const entity = await this.repository.customer.findOneById(input.id);

            if (!entity) {
                throw new AppError('cliente não encontrado', 204);
            }

            return CustomerMapper.entityToDto(entity);
        } catch (e) {
            throw e;
        }
    }
}
