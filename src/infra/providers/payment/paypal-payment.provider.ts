import { AxiosInstance } from 'axios';
import { PaymentProviderInterface } from '../@shared/contracts/provider';

export class PaypalPaymentProvider implements PaymentProviderInterface {
    private httpClient: AxiosInstance;

    constructor(httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    async pay(amount: number): Promise<number> {
        try {
            const response = await this.httpClient.post('https://api.paypal.com', { amount });
            return response.data;
        } catch (e) {
            throw e;
        }
    }
}
