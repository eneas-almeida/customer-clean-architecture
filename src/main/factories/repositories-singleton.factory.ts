import { CustomersRepositoryInterface } from '@/application/contracts';
import { CustomersMongodbRepository } from '@/infra/db/mongodb/repositories';

class RepositoriesSingletonFactory {
    public customers: CustomersRepositoryInterface;

    constructor() {
        this.make();
    }

    make() {
        this.customers = new CustomersMongodbRepository();
    }
}

export default new RepositoriesSingletonFactory();
