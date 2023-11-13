import { Notification } from '../notification';

export interface CustomersEntityInterface {
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
    validate(): void;
}
