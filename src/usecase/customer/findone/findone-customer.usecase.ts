import { RepositoryInterface } from '@/domain/@shared/contracts';
import { AppError } from '@/domain/@shared/errors';
import { CustomerMapper } from '@/infra/mappers';
import { validateMongoId } from '@/usecase/@shared/helper';
import { InputFindOneCustomerDto, OutputCustomerDto } from '../@shared/contracts/customer.dto';

export class FindOneCustomerUseCase {
    constructor(private repository: RepositoryInterface) {}

    async execute(input: InputFindOneCustomerDto): Promise<OutputCustomerDto> {
        try {
            const isValidId = validateMongoId(input.id);

            if (!isValidId) {
                throw new AppError('id do parâmetro inválido', 400);
            }

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
