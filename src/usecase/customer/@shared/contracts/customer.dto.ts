import { HATEOS, OutputDtoInterface } from '@/usecase/@shared/contracts/dtos';

export interface OutputCustomerDto extends OutputDtoInterface {
    id: string;
    document: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _links?: HATEOS[];
}

export interface InputCreateCustomerDto {
    document: number;
    name: string;
}

export interface InputFindOneCustomerDto {
    id: string;
}

export interface InputUpdateCustomerDto {
    document: number;
    name: string;
}
