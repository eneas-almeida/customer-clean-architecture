import { CustomersRepositoryInterface } from '@/application/contracts';
import { CustomersMapper } from '@/application/mappers';
import { CustomersEntityInterface } from '@/domain/@shared/contracts';
import { CustomersSchema } from '../schemas';

export class CustomersMongodbRepository implements CustomersRepositoryInterface {
    async create(entity: CustomersEntityInterface): Promise<CustomersEntityInterface> {
        const data = CustomersMapper.entityToSchemaData(entity);

        const schema = await CustomersSchema.create(data);

        entity.setId(schema._id.toString());

        return entity;
    }

    async update(entity: CustomersEntityInterface): Promise<CustomersEntityInterface> {
        const data = CustomersMapper.entityToSchemaData(entity);

        await CustomersSchema.findByIdAndUpdate(entity.id, data);

        return entity;
    }

    async findOneById(id: string): Promise<CustomersEntityInterface | null> {
        const schema = await CustomersSchema.findById(id);

        return schema ? CustomersMapper.schemaToEntity(schema) : null;
    }

    async findOneByDocument(document: number): Promise<CustomersEntityInterface | null> {
        const schema = await CustomersSchema.findOne({ document });

        return schema ? CustomersMapper.schemaToEntity(schema) : null;
    }
}
