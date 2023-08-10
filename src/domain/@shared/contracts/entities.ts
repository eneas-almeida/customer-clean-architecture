import { Notification } from '../notification/notification';

export interface AccountInterface {
    get id(): string;
    get email(): string;
    get password(): string;
    get createdAt(): Date;
    get updatedAt(): Date;
    get notification(): Notification;

    setId(value: string): void;
    setEmail(value: string): void;
    setPassword(value: string): void;
    setCreatedAt(value: Date): void;
    setUpdatedAt(value: Date): void;
}

export interface CustomerInterface {
    get id(): string;
    get document(): number;
    get name(): string;
    get createdAt(): Date;
    get updatedAt(): Date;
    get notification(): Notification;

    setId(value: string): void;
    setDocument(value: number): void;
    setName(value: string): void;
    setCreatedAt(value: Date): void;
    setUpdatedAt(value: Date): void;
}
