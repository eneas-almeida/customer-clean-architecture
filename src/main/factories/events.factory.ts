import { EventDispatcher } from '@/main/events/event-dispatcher';
import { MakeQueues } from './queues.factory';

export const MakeEvents = () => {
    const queue = MakeQueues();

    const event = new EventDispatcher();

    event.register('CreateCustomerEvent', {
        handle: (event) => queue.send('meutopico', event.eventData),
    });

    return event;
};
