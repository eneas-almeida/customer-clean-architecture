import {
    CustomerCreateInputDto,
    CustomerFindOneInputDto,
    CustomerUpdateInputDto,
    CustomerOutputDto,
} from '@/usecases/contracts/customer';
import { CreateCustomerUseCase, FindOneCustomerUseCase, UpdateCustomerUseCase } from '@/usecases/customer';
import { CustomerControllerInterface, HttpResponse } from '../contracts';
import { create, ok } from '../helpers';

export class CustomerController implements CustomerControllerInterface {
    constructor(
        private readonly createCustomerUseCase: CreateCustomerUseCase,
        private readonly updateCustomerUseCase: UpdateCustomerUseCase,
        private readonly findOneCustomerUseCase: FindOneCustomerUseCase
    ) {}

    async create(input: CustomerCreateInputDto): Promise<HttpResponse<CustomerOutputDto>> {
        return create(await this.createCustomerUseCase.execute(input));
    }

    async update(input: CustomerUpdateInputDto): Promise<HttpResponse<CustomerOutputDto>> {
        return ok(await this.updateCustomerUseCase.execute(input));
    }

    async findOne(input: CustomerFindOneInputDto): Promise<HttpResponse<CustomerOutputDto>> {
        return ok(await this.findOneCustomerUseCase.execute(input));
    }
}
