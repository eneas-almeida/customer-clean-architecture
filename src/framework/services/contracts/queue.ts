export interface QueueServiceInterface {
    init(): this;
    setProducer(): Promise<this>;
    setConsumer(groupId: string): Promise<this>;
    setTopic(topic: string, fromBeginning: boolean, context: any): Promise<this>;
    emit(topic: string, key: string, handler: string, data: any): void;
}

export interface QueueHandlerInterface {
    [key: string]: Function;
}
