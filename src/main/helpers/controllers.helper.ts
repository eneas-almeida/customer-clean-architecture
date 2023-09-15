import { InputFindOneCustomerDto, InputUpdateCustomerDto } from '@/usecases/contracts/customer';

export const dataFindOneHelper = (params: any, headers: any) => {
    const { id } = params;
    const { device } = headers;
    return { id, device } as InputFindOneCustomerDto;
};

export const dataUpdatedHelper = (params: any, body: any) => {
    const { id } = params;
    const { document, name } = body;
    return { id, document, name } as InputUpdateCustomerDto;
};
