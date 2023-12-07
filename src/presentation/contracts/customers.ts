import {
    CustomersCreateInputDto,
    CustomersFindOneInputDto,
    CustomersUpdateInputDto,
} from '@/application/contracts';
import { HttpResponse } from './http';

export interface CustomersControllerInterface {
    create: (input: CustomersCreateInputDto) => Promise<HttpResponse>;
    findOne: (input: CustomersFindOneInputDto) => Promise<HttpResponse>;
    update: (input: CustomersUpdateInputDto) => Promise<HttpResponse>;
}
