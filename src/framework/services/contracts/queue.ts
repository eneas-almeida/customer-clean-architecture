export interface QueueServiceInterface {
    emit(topic: string, key: string, handler: string, data: any): void;
}

export interface QueueHandlerInterface {
    [key: string]: Function;
}
