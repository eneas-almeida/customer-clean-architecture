import {
    CustomersCreateInputDto,
    CustomersFindOneInputDto,
    CustomersOutputDto,
    CustomersUpdateInputDto,
    CustomersUseCaseInterface,
} from '@/application/contracts/customers';
import { QueueServiceInterface } from '@/main/contracts/queue';
import { AppError } from '@/main/errors';
import { CustomersControllerInterface, HttpResponse } from '../contracts';
import { ok } from '../helpers';

export class CustomersController implements CustomersControllerInterface {
    constructor(
        private readonly usecase: CustomersUseCaseInterface,
        private readonly queue: QueueServiceInterface
    ) {}

    async create(input: CustomersCreateInputDto): Promise<HttpResponse> {
        const existsEntity = await this.usecase.container.repositories.customers.findOneByDocument(
            input.document
        );

        if (existsEntity) {
            throw new AppError('Customer already exists');
        }

        this.queue.onMessage('meutopico', this.usecase.create, input);

        return ok({
            message: 'Customer queued successfully',
        });
    }

    async update(input: CustomersUpdateInputDto): Promise<HttpResponse<CustomersOutputDto>> {
        return ok();
    }

    async findOne(input: CustomersFindOneInputDto): Promise<HttpResponse<CustomersOutputDto>> {
        const output = await this.usecase.findOne(input);
        return ok(output);
    }
}
