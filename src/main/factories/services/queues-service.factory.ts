import { KafkaQueueService } from '@/framework/services/kafka-queue.service';
import { CustomersUseCaseAdapter } from '@/main/adapters/usecases/customers-usecase.adapter';

export const MakeQueueService = async () => {
    const queue = new KafkaQueueService();

    queue.init();

    const customersUseCase = CustomersUseCaseAdapter();
    const handlers = {
        'handler-create-customer': customersUseCase.create,
        'handler-findone-customer': customersUseCase.findOne,
    };
    queue.setHandlers(handlers);

    await queue.setProducer();
    await queue.setConsumer('topic-customer', true, 'group-clean');

    return queue;
};
