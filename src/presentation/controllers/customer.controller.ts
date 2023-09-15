import {
    InputCreateCustomerDto,
    InputFindOneCustomerDto,
    InputUpdateCustomerDto,
    OutputCustomerDto,
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

    async create(input: InputCreateCustomerDto): Promise<HttpResponse<OutputCustomerDto>> {
        try {
            return create(await this.createCustomerUseCase.execute(input));
        } catch (e) {
            throw e;
        }
    }

    async update(input: InputUpdateCustomerDto): Promise<HttpResponse<OutputCustomerDto>> {
        try {
            return ok(await this.updateCustomerUseCase.execute(input));
        } catch (e) {
            throw e;
        }
    }

    async findOne(input: InputFindOneCustomerDto): Promise<HttpResponse<OutputCustomerDto>> {
        try {
            return ok(await this.findOneCustomerUseCase.execute(input));
        } catch (e) {
            throw e;
        }
    }
}
