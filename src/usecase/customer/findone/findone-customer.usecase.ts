import { RepositoryInterface } from '@/domain/@shared/contracts';
import { AppError } from '@/domain/@shared/errors';
import { InputFindOneCustomerDto, OutputFindOneCustomerDto } from './findone-customer.dto';
import { CustomerMapper } from '@/infra/mappers';

export class FindOneCustomerUseCase {
    constructor(private repository: RepositoryInterface) {}

    async execute(input: InputFindOneCustomerDto): Promise<OutputFindOneCustomerDto> {
        try {
            const entity = await this.repository.customer.findOneById(input.id);

            if (!entity) {
                throw new AppError('Cliente não encontrado', 204);
            }

            return CustomerMapper.entityToDto(entity);
        } catch (e) {
            throw e;
        }
    }
}
