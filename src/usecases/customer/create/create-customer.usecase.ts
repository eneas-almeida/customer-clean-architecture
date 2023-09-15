import { RepositoryInterface } from '@/domain/@shared/contracts';
import { IntegrationInterface } from '@/infra/integrations/contracts';
import { ProviderInterface } from '@/infra/providers/contracts';
import { AppError } from '@/main/errors';
import { CustomerMapper } from '@/main/mappers';
import { InputCreateCustomerDto, OutputCustomerDto } from '@/usecases/contracts/customer';

export class CreateCustomerUseCase {
    constructor(
        private readonly repository: RepositoryInterface,
        private readonly provider: ProviderInterface,
        private readonly integration: IntegrationInterface
    ) {}

    async execute(input: InputCreateCustomerDto): Promise<OutputCustomerDto> {
        try {
            const existsEntity = await this.repository.customer.findOneByDocument(input.document);

            if (existsEntity) {
                throw new AppError('customer already exists with document', 412);
            }

            let entity = CustomerMapper.dtoToEntity(input);

            entity = await this.repository.customer.create(entity);

            return CustomerMapper.entityToDto(entity);
        } catch (e) {
            throw e;
        }
    }
}
