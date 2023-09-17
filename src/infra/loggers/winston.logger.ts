import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const elasticsearchTransportOptions = {
    level: 'info',
    index: 'customer-api-index',
    ensureMappingTemplate: true,
    templateName: 'customer-api-template',
    template: {
        settings: {
            number_of_shards: 1,
            number_of_replicas: 0,
        },
        mappings: {
            properties: {
                timestamp: { type: 'date' },
                level: { type: 'keyword' },
                message: { type: 'text' },
            },
        },
    },
    clientOpts: {
        node: 'http://localhost:9200',
    },
};

export const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [new ElasticsearchTransport(elasticsearchTransportOptions)],
});
