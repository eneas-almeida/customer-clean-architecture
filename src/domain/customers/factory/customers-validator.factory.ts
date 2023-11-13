import { CustomersEntityInterface, ValidatorInterface } from '@/domain/@shared/contracts';
import { CustomersYupValidator } from '../validator';

export class CustomersValidatorFactory {
    static create(): ValidatorInterface<CustomersEntityInterface> {
        return new CustomersYupValidator();
    }
}
