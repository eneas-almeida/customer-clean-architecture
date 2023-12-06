import { CustomersControllerInterface } from '@/presentation/contracts';
import { CustomersController } from '@/presentation/controllers';
import { MakeQueuesService } from '../queues-service.factory';
import { CustomersUseCaseAdapter } from '@/main/adapters/usecases/customers-usecase.adapter';

export const MakeCustomersController = async (): Promise<CustomersControllerInterface> => {
    const queue = await MakeQueuesService();
    const usecase = CustomersUseCaseAdapter();

    return new CustomersController(usecase, queue);
};
