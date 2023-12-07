import {
    CustomersCreateInputDto,
    CustomersFindOneInputDto,
    CustomersUpdateInputDto,
    CustomersUseCaseInterface,
} from '@/application/contracts/customers';
import { QueueServiceInterface } from '@/framework/services/contracts';
import { CustomersControllerInterface, HttpResponse } from '../contracts';
import { ok } from '../helpers';

export class CustomersController implements CustomersControllerInterface {
    constructor(
        private readonly usecase: CustomersUseCaseInterface,
        private readonly queue: QueueServiceInterface
    ) {}

    async create(input: CustomersCreateInputDto): Promise<HttpResponse> {
        this.queue.emit('createcustomer', 'customeraccount', input);

        return ok({
            message: 'Customer queued successfully',
        });
    }

    async update(input: CustomersUpdateInputDto): Promise<HttpResponse> {
        const output = await this.usecase.update(input);
        return ok(output);
    }

    async findOne(input: CustomersFindOneInputDto): Promise<HttpResponse> {
        const output = await this.usecase.findOne(input);
        return ok(output);
    }
}
