import { RepositoryInterface } from '@/domain/@shared/contracts';
import { IntegrationInterface } from '@/framework/integrations/contracts';
import { CustomerMapper } from '@/data/mappers';
import { CustomerFindOneInputDto, CustomerOutputDto } from '@/usecases/contracts/customer';

export class FindOneCustomerUseCase {
    constructor(
        private readonly repository: RepositoryInterface,
        private readonly integration: IntegrationInterface
    ) {}

    async execute(input: CustomerFindOneInputDto): Promise<CustomerOutputDto | null> {
        const entity = await this.repository.customer.findOneById(input.id);

        return CustomerMapper.entityToDto(entity);
    }
}
