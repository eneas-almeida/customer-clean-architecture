import { v4 as uuidv4 } from 'uuid';
import { Notification } from '../notification/notification';
import { Id } from '../types/id.type';

export abstract class Entity {
    protected _id: string;
    protected _createdAt: Date;
    protected _updatedAt: Date;
    protected _notification: Notification;

    constructor(id: Id) {
        this._id = id || uuidv4();
        this._createdAt = new Date();
        this._updatedAt = new Date();
        this._notification = new Notification();
    }

    get id(): string {
        return this._id;
    }

    setId(value: string): void {
        this._id = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    setCreatedAt(value: Date): void {
        this._createdAt = value;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    setUpdatedAt(value: Date): void {
        this._updatedAt = value;
    }

    get notification(): Notification {
        return this._notification;
    }
}
