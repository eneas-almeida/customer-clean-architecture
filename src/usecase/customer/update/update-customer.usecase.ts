import { RepositoryInterface } from '@/domain/@shared/contracts';
import { AppError } from '@/domain/@shared/errors';
import { CustomerMapper } from '@/infra/mappers';
import { ProviderInterface } from '@/infra/providers/@shared/contracts/provider';
import { validateMongoId } from '@/usecase/@shared/helper';
import { InputUpdateCustomerDto, OutputCustomerDto } from '../@shared/contracts/customer.dto';

export class UpdateCustomerUseCase {
    private repository: RepositoryInterface;
    private provider: ProviderInterface;

    constructor(repository: RepositoryInterface, provider: ProviderInterface) {
        this.repository = repository;
        this.provider = provider;
    }

    async execute(id: string, input: InputUpdateCustomerDto): Promise<OutputCustomerDto> {
        try {
            const isValidId = validateMongoId(id);

            if (!isValidId) {
                throw new AppError('id do parâmetro inválido', 400);
            }

            const existsEntity = await this.repository.customer.findOneById(id);

            if (!existsEntity) {
                throw new AppError('cliente inexistente', 204);
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
