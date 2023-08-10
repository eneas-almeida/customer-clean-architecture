import { NotificationErrorProps } from '../notification/notification';

export class NotificationError {
    public readonly statusCode: number;
    public readonly message: string;

    constructor(statusCode?: number, message?: NotificationErrorProps[]) {
        this.statusCode = statusCode || 400;
        this.message = JSON.stringify(message) || 'Erro de validação de entidade';
    }
}
