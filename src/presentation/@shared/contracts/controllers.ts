import {
    InputCreateCustomerDto,
    InputFindOneCustomerDto,
    InputUpdateCustomerDto,
    OutputCustomerDto,
} from '@/usecase/customer/@shared/contracts/customer.dto';
import { HttpResponse } from '../helpers/http';

export interface AccountControllerInterface {
    generateToken: () => Promise<HttpResponse<string>>;
}

export interface CustomerControllerInterface {
    create: (input: InputCreateCustomerDto) => Promise<HttpResponse<OutputCustomerDto>>;
    update: (id: string, input: InputUpdateCustomerDto) => Promise<HttpResponse<OutputCustomerDto>>;
    findOne: (input: InputFindOneCustomerDto) => Promise<HttpResponse<OutputCustomerDto>>;
}
