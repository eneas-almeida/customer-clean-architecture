import { AxiosInstance } from 'axios';

export interface HttpClientInterface extends AxiosInstance {
    getInstance(): Promise<AxiosInstance>;
}
