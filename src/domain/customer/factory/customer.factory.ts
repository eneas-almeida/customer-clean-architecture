import { Id } from '@/domain/@shared/contracts';
import { CustomerEntity } from '../entity';

export class CustomerFactory {
    static create(document: number, name: string) {
        return new CustomerEntity(null, document, name);
    }

    static createWithId(id: Id, document: number, name: string) {
        return new CustomerEntity(id, document, name);
    }
}
