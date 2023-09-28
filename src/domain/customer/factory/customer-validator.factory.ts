import { CustomerInterface, ValidatorInterface } from '@/domain/@shared/contracts';
import { CustomerYupValidator } from '../validator';

export class CustomerValidatorFactory {
    static create(): ValidatorInterface<CustomerInterface> {
        return new CustomerYupValidator();
    }
}
