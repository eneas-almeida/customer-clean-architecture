import { CustomersControllerInterface } from '@/presentation/contracts';
import { CustomersController } from '@/presentation/controllers/customers.controller';
import { MakeEvents } from '../events.factory';

export const MakeCustomersController = async (): Promise<CustomersControllerInterface> => {
    const events = MakeEvents();

    return new CustomersController(events);
};
