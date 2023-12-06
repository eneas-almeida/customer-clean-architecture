import { CustomersControllerInterface } from '@/presentation/contracts';
import { CustomersController } from '@/presentation/controllers';
import { MakeQueuesProvider } from '../queues-provider.factory';
import { CustomersUseCaseAdapter } from '@/main/adapters/usecases/customers-usecase.adapter';

export const MakeCustomersController = async (): Promise<CustomersControllerInterface> => {
    const queue = await MakeQueuesProvider();
    const usecase = CustomersUseCaseAdapter();

    return new CustomersController(usecase, queue);
};
