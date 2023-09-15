import {
    InputCreateCustomerDto,
    InputFindOneCustomerDto,
    InputUpdateCustomerDto,
    OutputCustomerDto,
} from '@/usecases/contracts/customer';

export type HttpResponse<T = any> = {
    statusCode: number;
    body: T;
};

export interface HealthzControllerInterface {
    healthz: () => Promise<HttpResponse>;
}

export interface CustomerControllerInterface {
    create: (input: InputCreateCustomerDto) => Promise<HttpResponse<OutputCustomerDto>>;
    update: (input: InputUpdateCustomerDto) => Promise<HttpResponse<OutputCustomerDto>>;
    findOne: (input: InputFindOneCustomerDto) => Promise<HttpResponse<OutputCustomerDto>>;
}
