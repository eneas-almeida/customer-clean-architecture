import { AxiosInstance } from 'axios';
import {
    AxiosHttpClientService,
    KafkaQueueService,
    RabbitQueueService,
    ServicesInterface,
} from '@/framework/services';
import { QueueServiceInterface } from '@/framework/services/queue/contracts';

export const MakeHttpClientService = async (): Promise<AxiosInstance> => {
    const httpClient = new AxiosHttpClientService();
    const instance = await httpClient.getInstance();
    return instance;
};

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
    const httpClient = await MakeHttpClientService();
    return { queue, httpClient };
};
