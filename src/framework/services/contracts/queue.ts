export interface QueueServiceInterface {
    init(): this;
    setProducer(): Promise<this>;
    setConsumer(groupId: string): Promise<this>;
    setTopic(topic: string, fromBeginning: boolean, callback: Function): Promise<this>;
    emit(topic: string, data: any): void;
}

export interface QueueHandlerInterface {
    topic: string;
    callback: Function;
}
