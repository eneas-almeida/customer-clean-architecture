import { AxiosInstance } from 'axios';
import { ShippingProviderInterface } from '../@shared/contracts/provider';

export class FedexShippingProvider implements ShippingProviderInterface {
    private httpClient: AxiosInstance;

    constructor(httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    async calculate(price: number): Promise<number> {
        try {
            const response = await this.httpClient.post('http://localhost:3000/fedex', {
                price,
            });

            return response.data;
        } catch (e) {
            throw e;
        }
    }
}
