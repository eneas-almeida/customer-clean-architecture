import { RepositoryInterface } from '@/domain/@shared/contracts';
import { IntegrationInterface } from '@/infra/integrations/contracts';
import { CustomerMapper } from '@/main/mappers';
import { InputFindOneCustomerDto, OutputCustomerDto } from '@/usecases/contracts/customer';

export class FindOneCustomerUseCase {
    constructor(
        private readonly repository: RepositoryInterface,
        private readonly integration: IntegrationInterface
    ) {}

    async execute(input: InputFindOneCustomerDto): Promise<OutputCustomerDto | null> {
        try {
            const entity = await this.repository.customer.findOneById(input.id);

            return CustomerMapper.entityToDto(entity);
        } catch (e) {
            throw e;
        }
    }
}
