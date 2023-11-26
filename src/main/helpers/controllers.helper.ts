import { CustomersFindOneInputDto, CustomersUpdateInputDto } from '@/application/contracts';

export const dataFindOneHelper = (params: any) => {
    const { id } = params;
    return { id } as CustomersFindOneInputDto;
};

export const dataUpdatedHelper = (params: any, body: any) => {
    const { id } = params;
    const { document, name } = body;
    return { id, document, name } as CustomersUpdateInputDto;
};
