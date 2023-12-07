import { KafkaQueueService } from '@/framework/services/kafka-queue.service';
import { CustomersUseCaseAdapter } from '@/main/adapters/usecases/customers-usecase.adapter';

export const MakeQueuesService = async () => {
    const queue = new KafkaQueueService();

    queue.init();

    await queue.setProducer();
    await queue.setConsumer('customer-clean-architecture');

    const usecases = CustomersUseCaseAdapter();

    await queue.setTopic('createcustomer', true, usecases.create);

    return queue;
};
