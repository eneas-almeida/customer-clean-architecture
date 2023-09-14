import { InputFindOneCustomerDto } from '@/usecase/contracts';

export const dataFindOneHelper = (params: any, headers: any) => {
    const { id } = params;
    const { device } = headers;
    return { id, device } as InputFindOneCustomerDto;
};
