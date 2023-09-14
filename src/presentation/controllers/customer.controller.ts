import {
    InputCreateCustomerDto,
    InputFindOneCustomerDto,
    InputUpdateCustomerDto,
    OutputCustomerDto,
} from '@/usecase/contracts';
import { CreateCustomerUseCase, FindOneCustomerUseCase, UpdateCustomerUseCase } from '@/usecase/customer';
import { CustomerControllerInterface, HttpResponse } from '../contracts';
import { create, ok, serverError } from '../helpers';

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
            return serverError(e);
        }
    }

    async update(id: string, input: InputUpdateCustomerDto): Promise<HttpResponse<OutputCustomerDto>> {
        try {
            return ok(await this.updateCustomerUseCase.execute(id, input));
        } catch (e) {
            return serverError(e);
        }
    }

    async findOne(input: InputFindOneCustomerDto): Promise<HttpResponse<OutputCustomerDto>> {
        try {
            return ok(await this.findOneCustomerUseCase.execute(input));
        } catch (e) {
            return serverError(e);
        }
    }
}
