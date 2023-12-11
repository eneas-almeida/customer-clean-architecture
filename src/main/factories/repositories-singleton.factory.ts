import { CustomersRepositoryInterface } from '@/application/contracts';
import { CustomersMongodbRepository } from '@/infra/db/mongodb/repositories';

export class RepositoriesSingletonFactory {
    private static instance: Promise<RepositoriesSingletonFactory> | null;

    private constructor(public readonly customers: CustomersRepositoryInterface) {}

    public static async getInstance(): Promise<RepositoriesSingletonFactory> {
        if (!RepositoriesSingletonFactory.instance) {
            const customers = new CustomersMongodbRepository();

            return new RepositoriesSingletonFactory(customers);
        }

        return RepositoriesSingletonFactory.instance;
    }
}
