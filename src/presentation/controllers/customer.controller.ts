import { CreateCustomerUseCase, FindOneCustomerUseCase, UpdateCustomerUseCase } from '@/usecase/customer';
import { InputCreateCustomerDto, OutputCreateCustomerDto } from '@/usecase/customer/create';
import { InputFindOneCustomerDto, OutputFindOneCustomerDto } from '@/usecase/customer/findone';
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from '@/usecase/customer/update';
import { CustomerControllerInterface } from '../@shared/contracts';
import { HttpResponse, ok, create } from '../@shared/helpers';

export class CustomerController implements CustomerControllerInterface {
    constructor(
        private readonly createCustomerUseCase: CreateCustomerUseCase,
        private readonly updateCustomerUseCase: UpdateCustomerUseCase,
        private readonly findOneCustomerUseCase: FindOneCustomerUseCase
    ) {}

    async create(input: InputCreateCustomerDto): Promise<HttpResponse<OutputCreateCustomerDto>> {
        try {
            const output = await this.createCustomerUseCase.execute(input);
            return create(output);
        } catch (e) {
            throw e;
        }
    }

    async update(id: string, input: InputUpdateCustomerDto): Promise<HttpResponse<OutputUpdateCustomerDto>> {
        try {
            const output = await this.updateCustomerUseCase.execute(id, input);
            return ok(output);
        } catch (e) {
            throw e;
        }
    }

    async findOne(input: InputFindOneCustomerDto): Promise<HttpResponse<OutputFindOneCustomerDto>> {
        try {
            const output = await this.findOneCustomerUseCase.execute(input);
            return ok(output);
        } catch (e) {
            throw e;
        }
    }
}
