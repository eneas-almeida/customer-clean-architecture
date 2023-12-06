export interface EventInterface {
    dataTimeOccurred: Date;
    eventData: any;
}

export interface EventHandlerInterface<T extends EventInterface = EventInterface> {
    handle(event: T): void;
}

export interface EventDispatcherInterface {
    notify(eventName: string, event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    unregister(eventName: string, eventHandler: EventHandlerInterface): void;
    unregisterAll(): void;
}
