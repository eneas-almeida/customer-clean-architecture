import { CustomerInterface, ValidatorInterface } from '@/domain/@shared/contracts';
import { CustomerYupValidator } from '../validator/customer.validator';

export class CustomerValidatorFactory {
    static create(): ValidatorInterface<CustomerInterface> {
        return new CustomerYupValidator();
    }
}
