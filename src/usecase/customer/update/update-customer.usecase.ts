import { RepositoryInterface } from '@/domain/@shared/contracts';
import { AppError } from '@/domain/@shared/errors';
import { CustomerMapper } from '@/infra/mappers';
import { ProviderInterface } from '@/infra/providers/@shared/contracts/provider';
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update-customer.dto';

export class UpdateCustomerUseCase {
    private repository: RepositoryInterface;
    private provider: ProviderInterface;

    constructor(repository: RepositoryInterface, provider: ProviderInterface) {
        this.repository = repository;
        this.provider = provider;
    }

    async execute(id: string, input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        try {
            const existsEntity = await this.repository.customer.findOneById(id);

            if (!existsEntity) {
                throw new AppError('Customer not found', 412);
            }

            existsEntity.setName(input.name);
            existsEntity.setDocument(input.document);

            const entity = await this.repository.customer.update(existsEntity);

            return CustomerMapper.entityToDto(entity);
        } catch (e) {
            throw e;
        }
    }
}
