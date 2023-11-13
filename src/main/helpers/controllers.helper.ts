import { CustomerFindOneInputDto, CustomerUpdateInputDto } from '@/application/contracts/customer';

export const dataFindOneHelper = (params: any) => {
    const { id } = params;
    return { id } as CustomerFindOneInputDto;
};

export const dataUpdatedHelper = (params: any, body: any) => {
    const { id } = params;
    const { document, name } = body;
    return { id, document, name } as CustomerUpdateInputDto;
};
