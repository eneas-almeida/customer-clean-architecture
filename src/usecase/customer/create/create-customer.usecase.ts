import { RepositoryInterface } from '@/domain/@shared/contracts';
import { CustomerMapper } from '@/infra/mappers';
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create-customer.dto';
import { ProviderInterface } from '@/infra/providers/@shared/contracts/provider';

export class CreateCustomerUseCase {
    private repository: RepositoryInterface;
    private provider: ProviderInterface;

    constructor(repository: RepositoryInterface, provider: ProviderInterface) {
        this.repository = repository;
        this.provider = provider;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        try {
            let entity = CustomerMapper.dtoToEntity(input);

            try {
                await this.provider.payment.pay(10);
            } catch (e) {
                console.error(e.message || 'err');
            }

            entity = await this.repository.customer.create(entity);

            return CustomerMapper.entityToDto(entity);
        } catch (e) {
            throw e;
        }
    }
}
