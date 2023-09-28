import { HealthzOutputDto } from '@/usecases/contracts';
import { name, version } from '../../../package.json';
import { HealthzControllerInterface, HttpResponse } from '../contracts';
import { ok } from '../helpers';

export class HealthzController implements HealthzControllerInterface {
    async handle(): Promise<HttpResponse<HealthzOutputDto>> {
        return ok({ name, version });
    }
}
