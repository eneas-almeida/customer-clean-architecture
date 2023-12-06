import { CustomersEntity } from '../entity';

export class CustomersFactory {
    static create(document: number, name: string) {
        return new CustomersEntity(null, document, name, null);
    }

    static createWithCreatedAt(document: number, name: string, createdAt: Date) {
        return new CustomersEntity(null, document, name, createdAt);
    }

    static createWithId(id: string, document: number, name: string) {
        return new CustomersEntity(id, document, name, null);
    }
}
