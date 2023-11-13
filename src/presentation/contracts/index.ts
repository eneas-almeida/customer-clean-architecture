import { HealthzOutputDto } from '@/application/contracts';
import {
    CustomersCreateInputDto,
    CustomersFindOneInputDto,
    CustomersUpdateInputDto,
    CustomersOutputDto,
} from '@/application/contracts/customers';

export type HttpResponse<T = any> = {
    statusCode: number;
    body: T;
};

export interface HealthzControllerInterface {
    handle: () => Promise<HttpResponse<HealthzOutputDto>>;
}

export interface CustomersControllerInterface {
    create: (input: CustomersCreateInputDto) => Promise<HttpResponse<CustomersOutputDto>>;
    findOne: (input: CustomersFindOneInputDto) => Promise<HttpResponse<CustomersOutputDto>>;
    update: (input: CustomersUpdateInputDto) => Promise<HttpResponse<CustomersOutputDto>>;
}
