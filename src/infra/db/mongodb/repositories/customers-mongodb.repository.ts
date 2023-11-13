import { CustomersRepositoryInterface } from '@/application/contracts';
import { CustomersMapper } from '@/application/mappers';
import { CustomersEntityInterface } from '@/domain/@shared/contracts';
import { CustomersSchema } from '../schemas';

export class CustomersMongodbRepository implements CustomersRepositoryInterface {
    async create(entity: CustomersEntityInterface): Promise<CustomersEntityInterface> {
        try {
            const data = CustomersMapper.entityToSchemaData(entity);

            const schema = await CustomersSchema.create(data);

            entity.setId(schema._id.toString());

            return entity;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async update(entity: CustomersEntityInterface): Promise<CustomersEntityInterface> {
        try {
            const data = CustomersMapper.entityToSchemaData(entity);

            await CustomersSchema.findByIdAndUpdate(entity.id, data);

            return entity;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async findOneById(id: string): Promise<CustomersEntityInterface | null> {
        try {
            const schema = await CustomersSchema.findById(id);

            return schema ? CustomersMapper.schemaToEntity(schema) : null;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async findOneByDocument(document: number): Promise<CustomersEntityInterface | null> {
        try {
            const schema = await CustomersSchema.findOne({ document });

            return schema ? CustomersMapper.schemaToEntity(schema) : null;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
