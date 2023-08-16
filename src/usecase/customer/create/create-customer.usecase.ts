import { RepositoryInterface } from '@/domain/@shared/contracts';
import { CustomerMapper } from '@/infra/mappers';
import { ProviderInterface } from '@/infra/providers/@shared/contracts/provider';
import { InputCreateCustomerDto, OutputCustomerDto } from '../@shared/contracts/customer.dto';

export class CreateCustomerUseCase {
    private repository: RepositoryInterface;
    private provider: ProviderInterface;

    constructor(repository: RepositoryInterface, provider: ProviderInterface) {
        this.repository = repository;
        this.provider = provider;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCustomerDto> {
        try {
            let entity = CustomerMapper.dtoToEntity(input);

            entity = await this.repository.customer.create(entity);

            return CustomerMapper.entityToDto(entity);
        } catch (e) {
            throw e;
        }
    }
}
