import { AccountInterface, CustomerInterface } from './entities';

export interface AccountRepositoryInterface {
    signUp(entity: AccountInterface): Promise<AccountInterface>;
    signIn(email: string, password: string): Promise<AccountInterface>;
}

export interface CustomerRepositoryInterface {
    create(entity: CustomerInterface): Promise<CustomerInterface>;
    update(entity: CustomerInterface): Promise<CustomerInterface>;
    findOneById(id: string): Promise<CustomerInterface | null>;
}

export interface RepositoryInterface {
    account?: AccountRepositoryInterface;
    customer?: CustomerRepositoryInterface;
}
