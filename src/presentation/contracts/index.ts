import {
    InputCreateCustomerDto,
    InputFindOneCustomerDto,
    InputUpdateCustomerDto,
    OutputCustomerDto,
} from '@/usecase/contracts';

export type HttpResponse<T = any> = {
    statusCode: number;
    body: T;
};

export interface CustomerControllerInterface {
    create: (input: InputCreateCustomerDto) => Promise<HttpResponse<OutputCustomerDto>>;
    update: (id: string, input: InputUpdateCustomerDto) => Promise<HttpResponse<OutputCustomerDto>>;
    findOne: (input: InputFindOneCustomerDto) => Promise<HttpResponse<OutputCustomerDto>>;
}
