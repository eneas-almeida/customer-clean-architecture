export interface QueueServiceInterface {
    init(): this;
    setProducer(): Promise<this>;
    setConsumer(groupId: string): Promise<this>;
    setTopic(topic: string, fromBeginning?: boolean): Promise<this>;
    emit(topic: string, data: any): void;
    handle(topic: string, data: any): void;
}
