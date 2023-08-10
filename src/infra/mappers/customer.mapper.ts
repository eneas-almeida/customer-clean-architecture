import { CustomerInterface } from '@/domain/@shared/contracts';
import { CustomerFactory } from '@/domain/customer/factory/customer.factory';
import { InputCreateCustomerDto, OutputCreateCustomerDto } from '@/usecase/customer/create';

export class CustomerMapper {
    static dataToDto(data: any): InputCreateCustomerDto {
        return {
            document: data.document,
            name: data.name,
        };
    }

    static dtoToEntity(input: InputCreateCustomerDto): CustomerInterface {
        return CustomerFactory.create(input.document, input.name);
    }

    static entityToDto(entity: CustomerInterface): OutputCreateCustomerDto {
        return {
            id: entity.id,
            document: entity.document,
            name: entity.name,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
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
