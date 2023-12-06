import { KafkaQueue } from '@/main/queues/kafka.queue';
import { customersUseCaseAdapter } from '../adapters/usecases/customers-usecase.adapter';

export const MakeQueues = () => {
    const customersUseCase = customersUseCaseAdapter();

    const queue = new KafkaQueue(customersUseCase);
    queue.setup();

    return queue;
};
