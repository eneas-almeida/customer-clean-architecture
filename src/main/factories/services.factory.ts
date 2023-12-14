import { KafkaQueueService } from '@/framework/services';
import { QueueServiceInterface, ServicesInterface } from '@/framework/services/contracts';
import { RabbitQueueService } from '@/framework/services/rabbit-queue.service';

export const MakeKafkaQueueService = async (): Promise<QueueServiceInterface> => {
    const kafka = new KafkaQueueService();
    await kafka.setProducer();
    await kafka.setConsumer('topic-customer', true, 'group-clean');
    return kafka;
};

export const MakeRabbitQueueService = async (): Promise<QueueServiceInterface> => {
    const rabbit = new RabbitQueueService();
    await rabbit.setProducer();
    await rabbit.setConsumer('topic-customer');
    return rabbit;
};

export const MakeServices = async (): Promise<ServicesInterface> => {
    const queue = await MakeKafkaQueueService();
    return { queue };
};
