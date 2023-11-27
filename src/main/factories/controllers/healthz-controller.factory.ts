import { HealthzControllerInterface } from '@/presentation/contracts';
import { HealthzController } from '@/presentation/controllers/healthz.controller';

export const MakeHealthzController = async (): Promise<HealthzControllerInterface> => {
    return new HealthzController();
};
