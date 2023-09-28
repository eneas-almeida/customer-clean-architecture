import { HealthzOutputDto } from '@/usecases/contracts';
import {
    CustomerCreateInputDto,
    CustomerFindOneInputDto,
    CustomerUpdateInputDto,
    CustomerOutputDto,
} from '@/usecases/contracts/customer';

export type HttpResponse<T = any> = {
    statusCode: number;
    body: T;
};

export interface HealthzControllerInterface {
    handle: () => Promise<HttpResponse<HealthzOutputDto>>;
}

export interface CustomerControllerInterface {
    create: (input: CustomerCreateInputDto) => Promise<HttpResponse<CustomerOutputDto>>;
    findOne: (input: CustomerFindOneInputDto) => Promise<HttpResponse<CustomerOutputDto>>;
    update: (input: CustomerUpdateInputDto) => Promise<HttpResponse<CustomerOutputDto>>;
}
