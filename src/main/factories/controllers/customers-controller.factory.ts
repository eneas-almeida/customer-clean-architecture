import { CustomersUseCaseAdapter } from '@/main/adapters/usecases/customers-usecase.adapter';
import { CustomersControllerInterface } from '@/presentation/contracts';
import { CustomersController } from '@/presentation/controllers';
import { ServicesSingletonFactory } from '../services-singleton.factory';

export const MakeCustomersController = async (): Promise<CustomersControllerInterface> => {
    const services = await ServicesSingletonFactory.getInstance();

    const customersUseCase = CustomersUseCaseAdapter();

    const handlers = [
        { key: 'handler-create-customer', fn: customersUseCase.create },
        { key: 'handler-findone-customer', fn: customersUseCase.findOne },
    ];

    services.queue.setHandlers(handlers);

    return new CustomersController(services, customersUseCase);
};
