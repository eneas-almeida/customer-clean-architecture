import { KafkaQueueService } from '../services/kafka-queue.service';

export const MakeQueuesProvider = async () => {
    const queue = new KafkaQueueService();

    queue.init();

    await queue.setProducer();
    await queue.setConsumer('customer-clean-architecture');
    await queue.setTopic('meutopico', true);

    return queue;
};
