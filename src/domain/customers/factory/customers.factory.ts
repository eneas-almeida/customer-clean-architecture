import { CustomersEntity } from '../entity';

export class CustomersFactory {
    static create(document: number, name: string) {
        return new CustomersEntity(null, document, name);
    }

    static createWithId(id: string, document: number, name: string) {
        return new CustomersEntity(id, document, name);
    }
}
