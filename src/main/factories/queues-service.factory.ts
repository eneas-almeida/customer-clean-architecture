import { CustomersUseCaseAdapter } from '../adapters/usecases/customers-usecase.adapter';
import { KafkaQueueService } from '../services/kafka-queue.service';

export const MakeQueuesService = async () => {
    const usecases = CustomersUseCaseAdapter();

    const queue = new KafkaQueueService(usecases);

    queue.init();

    await queue.setProducer();
    await queue.setConsumer('customer-clean-architecture');
    await queue.setTopic('meutopico', true);

    return queue;
};
