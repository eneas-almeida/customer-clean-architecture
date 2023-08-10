import { HttpResponse } from '../helpers/http';

import { InputCreateCustomerDto, OutputCreateCustomerDto } from '@/usecase/customer/create';
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from '@/usecase/customer/update';
import { InputFindOneCustomerDto, OutputFindOneCustomerDto } from '@/usecase/customer/findone';

export interface CustomerControllerInterface {
    create: (input: InputCreateCustomerDto) => Promise<HttpResponse<OutputCreateCustomerDto>>;
    update: (id: string, input: InputUpdateCustomerDto) => Promise<HttpResponse<OutputUpdateCustomerDto>>;
    findOne: (input: InputFindOneCustomerDto) => Promise<HttpResponse<OutputFindOneCustomerDto>>;
}
