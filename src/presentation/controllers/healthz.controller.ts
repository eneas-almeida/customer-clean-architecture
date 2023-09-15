import { name, version } from '../../../package.json';
import { HealthzControllerInterface, HttpResponse } from '../contracts';
import { ok } from '../helpers';

export class HealthzController implements HealthzControllerInterface {
    async healthz(): Promise<HttpResponse<void>> {
        try {
            return ok({
                name,
                version,
            });
        } catch (e) {
            throw e;
        }
    }
}
