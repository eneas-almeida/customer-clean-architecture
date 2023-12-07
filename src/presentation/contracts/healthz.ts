import { HttpResponse } from './http';

export interface HealthzControllerInterface {
    handle: () => Promise<HttpResponse>;
}
