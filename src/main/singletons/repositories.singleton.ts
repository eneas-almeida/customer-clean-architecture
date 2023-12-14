import { CustomersRepositoryInterface } from '@/application/contracts';
import { MakeRepositories } from '../factories';

export class RepositoriesSingleton {
    private static instance: Promise<RepositoriesSingleton> | null;

    private constructor(public readonly customers: CustomersRepositoryInterface) {}

    public static async getInstance(): Promise<RepositoriesSingleton> {
        if (!RepositoriesSingleton.instance) {
            const { customers } = await MakeRepositories();

            return new RepositoriesSingleton(customers);
        }

        return RepositoriesSingleton.instance;
    }
}
