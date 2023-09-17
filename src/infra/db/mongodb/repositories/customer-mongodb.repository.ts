import { CustomerMapper } from '@/data/mappers';
import { CustomerInterface, CustomerRepositoryInterface } from '@/domain/@shared/contracts';
import { ServerError } from '@/infra/main/errors';
import { CustomerSchema } from '../schemas';

export class CustomerMongodbRepository implements CustomerRepositoryInterface {
    async create(entity: CustomerInterface): Promise<CustomerInterface> {
        const data = CustomerMapper.entityToSchemaData(entity);

        try {
            const schema = await CustomerSchema.create(data);

            entity.setId(schema._id.toString());

            return entity;
        } catch (e) {
            throw new ServerError(e.message);
        }
    }

    async update(entity: CustomerInterface): Promise<CustomerInterface> {
        try {
            const data = CustomerMapper.entityToSchemaData(entity);

            await CustomerSchema.findByIdAndUpdate(entity.id, data);

            return entity;
        } catch (e) {
            throw new ServerError(e.message);
        }
    }

    async findOneById(id: string): Promise<CustomerInterface | null> {
        try {
            const schema = await CustomerSchema.findById(id);

            return schema ? CustomerMapper.schemaToEntity(schema) : null;
        } catch (e) {
            throw new ServerError(e.message);
        }
    }

    async findOneByDocument(document: number): Promise<CustomerInterface | null> {
        try {
            const schema = await CustomerSchema.findOne({ document });

            return schema ? CustomerMapper.schemaToEntity(schema) : null;
        } catch (e) {
            throw new ServerError(e.message);
        }
    }
}
