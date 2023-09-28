import { CustomerInterface } from '@/domain/@shared/contracts';
import { CustomerFactory } from '@/domain/customer/factory/customer.factory';
import { envs } from '@/main/configs';
import { api } from '@/main/utils';

import { CustomerCreateInputDto, CustomerOutputDto } from '@/usecases/contracts/customer';

export class CustomerMapper {
    static dataToDto(data: any): CustomerCreateInputDto {
        return {
            document: data.document,
            name: data.name,
        };
    }

    static dtoToEntity(input: CustomerCreateInputDto): CustomerInterface {
        return CustomerFactory.create(input.document, input.name);
    }

    static entityToDto(entity: CustomerInterface): CustomerOutputDto {
        const url = `${api}/customers`;

        const output: CustomerOutputDto = {
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

    static entityToSchemaData(entity: CustomerInterface) {
        return {
            document: entity.document,
            name: entity.name,
        };
    }

    static schemaToEntity(schema: any): CustomerInterface {
        const entity = CustomerFactory.create(schema.document, schema.name);

        entity.setId(schema.id);
        entity.setCreatedAt(schema.createdAt);
        entity.setUpdatedAt(schema.updatedAt);

        return entity;
    }

    static schemasToEntities(schemas: any[]): CustomerInterface[] {
        return schemas.map((schema) => CustomerMapper.schemaToEntity(schema));
    }
}
