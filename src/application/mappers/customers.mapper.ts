import { CustomersEntityInterface } from '@/domain/@shared/contracts';
import { CustomersFactory } from '@/domain/customers/factory/customers.factory';
import { envs } from '@/main/configs';
import { api } from '@/main/utils';

import { CustomersCreateInputDto, CustomersOutputDto } from '@/application/contracts/customers';

export class CustomersMapper {
    static dataToDto(data: any): CustomersCreateInputDto {
        return {
            document: data.document,
            name: data.name,
        };
    }

    static dtoToEntity(input: CustomersCreateInputDto): CustomersEntityInterface {
        return CustomersFactory.create(input.document, input.name);
    }

    static entityToDto(entity: CustomersEntityInterface): CustomersOutputDto {
        const url = `${api}/customers`;

        const output: CustomersOutputDto = {
            id: entity.id,
            document: entity.document,
            name: entity.name,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };

        if (envs.api.hateosActivated) {
            const hateos = [
                { method: 'post', url, description: 'Create a new customer' },
                { method: 'put', url: `${url}/:id`, description: 'Update a customer' },
                { method: 'get', url: `${url}/:id`, description: 'Find a customer' },
            ];

            output['_links'] = hateos;
        }

        return output;
    }

    static entityToSchemaData(entity: CustomersEntityInterface) {
        return {
            document: entity.document,
            name: entity.name,
        };
    }

    static schemaToEntity(schema: any): CustomersEntityInterface {
        const entity = CustomersFactory.create(schema.document, schema.name);

        entity.setId(schema.id);
        entity.setCreatedAt(schema.createdAt);
        entity.setUpdatedAt(schema.updatedAt);

        return entity;
    }

    static schemasToEntities(schemas: any[]): CustomersEntityInterface[] {
        return schemas.map((schema) => CustomersMapper.schemaToEntity(schema));
    }
}
