import { CustomerInterface } from './entities';

export interface CustomerRepositoryInterface {
    create(entity: CustomerInterface): Promise<CustomerInterface>;
    update(entity: CustomerInterface): Promise<CustomerInterface>;
    findOneById(id: string): Promise<CustomerInterface | null>;
    findOneByDocument(document: number): Promise<CustomerInterface | null>;
}

export interface RepositoryInterface {
    customer?: CustomerRepositoryInterface;
}
