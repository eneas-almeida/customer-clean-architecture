import { CustomersUseCaseAdapter } from '@/main/adapters/usecases/customers-usecase.adapter';
import { ServicesSingleton } from '@/main/singletons/services.singleton';
import { CustomersControllerInterface } from '@/presentation/contracts';
import { CustomersController } from '@/presentation/controllers';

export const MakeCustomersController = async (): Promise<CustomersControllerInterface> => {
    const services = await ServicesSingleton.getInstance();
    const customersUseCase = await CustomersUseCaseAdapter();

    const handlers = [
        { key: 'handler-create-customer', fn: customersUseCase.create },
        { key: 'handler-findone-customer', fn: customersUseCase.findOne },
    ];

    services.queue.setHandlers(handlers);

    return new CustomersController(services, customersUseCase);
};
