export interface QueueServiceInterface {
    setHandlers(handlers?: QueueHandler[]): void;
    emit(topic: string, key: string, handler: string, data: any): void;
}

export interface QueueHandler {
    key: string;
    fn: Function;
}
