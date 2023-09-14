import { HATEOS, OutputDtoInterface } from './hateos';

export interface OutputCustomerDto extends OutputDtoInterface {
    id: string;
    document: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _links?: HATEOS[];
}

interface DeviceDto {
    device: string;
}

export interface InputCreateCustomerDto extends DeviceDto {
    document: number;
    name: string;
}

export interface InputFindOneCustomerDto extends DeviceDto {
    id: string;
}

export interface InputUpdateCustomerDto extends DeviceDto {
    document: number;
    name: string;
}
