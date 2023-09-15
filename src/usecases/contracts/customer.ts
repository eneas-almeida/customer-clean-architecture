import { HATEOS, OutputHateosDto } from './base';

export interface InputCreateCustomerDto {
    document: number;
    name: string;
}

export interface InputUpdateCustomerDto {
    id: string;
    document: number;
    name: string;
}

export interface InputFindOneCustomerDto {
    device: string;
    id: string;
}

export interface OutputCustomerDto extends OutputHateosDto {
    id: string;
    document: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _links?: HATEOS[];
}
