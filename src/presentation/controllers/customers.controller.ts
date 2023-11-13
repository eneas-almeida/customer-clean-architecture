import {
    CustomersCreateInputDto,
    CustomersFindOneInputDto,
    CustomersOutputDto,
    CustomersUpdateInputDto,
    CustomersUseCaseInterface,
} from '@/application/contracts/customers';
import { CustomersControllerInterface, HttpResponse } from '../contracts';
import { create, ok } from '../helpers';

export class CustomersController implements CustomersControllerInterface {
    constructor(private readonly useCases: CustomersUseCaseInterface) {}

    async create(input: CustomersCreateInputDto): Promise<HttpResponse<CustomersOutputDto>> {
        return create(await this.useCases.create(input));
    }

    async update(input: CustomersUpdateInputDto): Promise<HttpResponse<CustomersOutputDto>> {
        return ok(await this.useCases.update(input));
    }

    async findOne(input: CustomersFindOneInputDto): Promise<HttpResponse<CustomersOutputDto>> {
        return ok(await this.useCases.findOne(input));
    }
}
