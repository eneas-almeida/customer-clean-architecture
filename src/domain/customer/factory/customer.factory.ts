import { Id } from '@/domain/@shared/types/id.type';
import { Customer } from '../entity/customer.entity';

export class CustomerFactory {
    static create(document: number, name: string) {
        return new Customer(null, document, name);
    }

    static createWithId(_id: Id, document: number, name: string) {
        return new Customer(null, document, name);
    }
}
