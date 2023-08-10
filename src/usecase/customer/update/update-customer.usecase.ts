import { RepositoryInterface } from '@/domain/@shared/contracts';
import { CustomerMapper } from '@/infra/mappers';
import { ProviderInterface } from '@/infra/providers/@shared/contracts/provider';
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update-customer.dto';
import { AppError } from '@/domain/@shared/errors';

export class UpdateCustomerUseCase {
    private repository: RepositoryInterface;
    private provider: ProviderInterface;

    constructor(repository: RepositoryInterface, provider: ProviderInterface) {
        this.repository = repository;
        this.provider = provider;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        try {
            let entity = CustomerMapper.dtoToEntity(input);

            const hasEntity = await this.repository.customer.findOneById(input.id);

            if (!hasEntity) {
                throw new AppError('Customer not found', 412);
            }

            entity = await this.repository.customer.update(hasEntity);

            return CustomerMapper.entityToDto(entity);
        } catch (e) {
            throw e;
        }
    }
}
