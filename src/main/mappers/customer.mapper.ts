import { CustomerInterface } from '@/domain/@shared/contracts';
import { CustomerFactory } from '@/domain/customer/factory/customer.factory';
import { envs } from '@/main/configs';
import { api } from '@/main/utils';
import { InputCreateCustomerDto, OutputCustomerDto } from '@/usecase/contracts';

export class CustomerMapper {
    static dataToDto(data: any, headers: any): InputCreateCustomerDto {
        return {
            device: headers.device,
            document: data.document,
            name: data.name,
        };
    }

    static dtoToEntity(input: InputCreateCustomerDto): CustomerInterface {
        return CustomerFactory.create(input.document, input.name);
    }

    static entityToDto(entity: CustomerInterface): OutputCustomerDto {
        const url = `${api}/customers`;

        const output: OutputCustomerDto = {
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

    static schemaToEntity(model: any): CustomerInterface {
        const entity = CustomerFactory.create(model.document, model.name);
        entity.setId(model.id);
        entity.setCreatedAt(model.createdAt);
        entity.setUpdatedAt(model.updatedAt);
        return entity;
    }

    static schemasToEntities(models: any[]): CustomerInterface[] {
        return models.map((model) => CustomerMapper.schemaToEntity(model));
    }
}
