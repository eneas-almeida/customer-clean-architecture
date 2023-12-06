export interface QueueServiceInterface {
    init(): this;
    setProducer(): Promise<this>;
    setConsumer(groupId: string): Promise<this>;
    setTopic(topic: string, fromBeginning?: boolean): Promise<this>;
    onMessage(topic: string, callback: Function, data: any): void;
}
