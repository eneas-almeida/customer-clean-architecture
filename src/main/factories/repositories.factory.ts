import { CustomersMongodbRepository } from '@/infra/db/mongodb/repositories';

export const MakeRepositories = () => {
    return {
        customers: new CustomersMongodbRepository(),
    };
};
