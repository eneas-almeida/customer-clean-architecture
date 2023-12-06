import {
    CustomersCreateInputDto,
    CustomersFindOneInputDto,
    CustomersOutputDto,
    CustomersUpdateInputDto,
} from '@/application/contracts/customers';
import { CustomersControllerInterface, HttpResponse } from '../contracts';
import { ok } from '../helpers';
import { EventDispatcherInterface } from '@/main/events/contracts/event-dispatcher.interface';

export class CustomersController implements CustomersControllerInterface {
    constructor(private readonly dispatcher: EventDispatcherInterface) {}

    async create(input: CustomersCreateInputDto): Promise<HttpResponse> {
        this.dispatcher.notify('CreateCustomerEvent', { dataTimeOccurred: new Date(), eventData: input });

        return ok({
            message: 'Customer created successfully',
        });
    }

    async update(input: CustomersUpdateInputDto): Promise<HttpResponse<CustomersOutputDto>> {
        return ok();
    }

    async findOne(input: CustomersFindOneInputDto): Promise<HttpResponse<CustomersOutputDto>> {
        return ok();
    }
}
