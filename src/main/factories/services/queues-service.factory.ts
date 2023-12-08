import { KafkaQueueService } from '@/framework/services/kafka-queue.service';
import { CustomersUseCaseAdapter } from '@/main/adapters/usecases/customers-usecase.adapter';

export const MakeQueuesService = async () => {
    const queue = new KafkaQueueService();

    queue.init();

    await queue.setProducer();
    await queue.setConsumer('group-clean');

    const customersUseCase = CustomersUseCaseAdapter();

    const handlers = {
        'handler-create-customer': customersUseCase.create,
        'handler-findone-customer': customersUseCase.findOne,
    };

    await queue.setTopic('topic-customer', true, handlers);

    return queue;
};
