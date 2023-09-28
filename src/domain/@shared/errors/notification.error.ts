import { NotificationErrorProps } from '../notification';

export class NotificationError {
    public readonly statusCode: number;
    public readonly message: string;
    public readonly description: string;

    constructor(statusCode?: number, message?: NotificationErrorProps[], description?: string) {
        this.statusCode = statusCode || 400;
        this.message = 'request inválida';
        this.description = this.mountMessage(message);
    }

    private mountMessage(message: NotificationErrorProps[]): string {
        let messages = '';

        const check = (index: number, count: number): string => {
            return count > 1 && index + 1 !== count ? ', ' : '';
        };

        const count = message.length;

        let character: string = '';

        if (message) {
            message.forEach((error, index) => {
                character = check(index, count);
                messages += `${error.message}${character}`;
            });
        }

        return messages;
    }
}
