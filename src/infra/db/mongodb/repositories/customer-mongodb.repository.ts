import { CustomerMapper } from '@/infra/mappers/customer.mapper';
import { CustomerInterface, CustomerRepositoryInterface } from '@/domain/@shared/contracts';
import { CustomerSchema } from '../schemas';

export class CustomerMongodbRepository implements CustomerRepositoryInterface {
    async create(entity: CustomerInterface): Promise<CustomerInterface> {
        const data = CustomerMapper.entityToSchemaData(entity);

        try {
            const schema = await CustomerSchema.create(data);

            entity.setId(schema._id.toString());

            return entity;
        } catch (e) {
            throw e;
        }
    }

    async update(entity: CustomerInterface): Promise<CustomerInterface> {
        try {
            const data = CustomerMapper.entityToSchemaData(entity);

            await CustomerSchema.findByIdAndUpdate(entity.id, data);

            return entity;
        } catch (e) {
            throw e;
        }
    }

    async findOneById(id: string): Promise<CustomerInterface | null> {
        try {
            const schema = await CustomerSchema.findById(id);

            return schema ? CustomerMapper.schemaToEntity(schema) : null;
        } catch (e) {
            throw e;
        }
    }
}
