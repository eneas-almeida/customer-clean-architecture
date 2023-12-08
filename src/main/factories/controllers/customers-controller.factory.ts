import { CustomersControllerInterface } from '@/presentation/contracts';
import { CustomersController } from '@/presentation/controllers';
import { MakeQueueService } from '../services/queues-service.factory';
import { CustomersUseCaseAdapter } from '@/main/adapters/usecases/customers-usecase.adapter';

export const MakeCustomersController = async (): Promise<CustomersControllerInterface> => {
    const queue = await MakeQueueService();
    const usecase = CustomersUseCaseAdapter();

    return new CustomersController(usecase, queue);
};
