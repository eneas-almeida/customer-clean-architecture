import {
    CustomersCreateInputDto,
    CustomersFindOneInputDto,
    CustomersUpdateInputDto,
    CustomersUseCaseInterface,
} from '@/application/contracts/customers';
import { ServicesInterface } from '@/framework/services';
import { CustomersControllerInterface, HttpResponse } from '../contracts';
import { ok } from '../helpers';

export class CustomersController implements CustomersControllerInterface {
    constructor(
        private readonly services: ServicesInterface,
        private readonly useCases: CustomersUseCaseInterface
    ) {}

    async create(input: CustomersCreateInputDto): Promise<HttpResponse> {
        this.services.queue.emit('topic-customer', 'key-customer', 'handler-create-customer', input);

        return ok({
            message: 'Customer queued successfully',
        });
    }

    async update(input: CustomersUpdateInputDto): Promise<HttpResponse> {
        const output = await this.useCases.update(input);
        return ok(output);
    }

    async findOne(input: CustomersFindOneInputDto): Promise<HttpResponse> {
        const output = await this.useCases.findOne(input);
        return ok(output);
    }
}
