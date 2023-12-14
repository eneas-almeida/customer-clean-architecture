import { CustomersRepositoryInterface } from '@/application/contracts';
import { RepositoriesInterface } from '@/application/contracts/repository';
import { CustomersMongodbRepository } from '@/infra/db/mongodb/repositories';

export const MakeCustomersRepository = (): CustomersRepositoryInterface => {
    const customers = new CustomersMongodbRepository();
    return customers;
};

export const MakeRepositories = async (): Promise<RepositoriesInterface> => {
    const customers = MakeCustomersRepository();
    return { customers };
};
