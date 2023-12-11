import { KafkaQueueService } from '@/framework/services/kafka-queue.service';

export const KafkaQueueConfig = async () => {
    const queue = new KafkaQueueService();

    queue.init();

    await queue.setProducer();
    await queue.setConsumer('topic-customer', true, 'group-clean');

    return queue;
};
