import { RepositoryInterface } from '@/application/contracts/repository';
import { CustomersMongodbRepository } from '@/infra/db/mongodb/repositories';

export const MakeRepositories = (): RepositoryInterface => {
    return {
        customers: new CustomersMongodbRepository(),
    };
};
