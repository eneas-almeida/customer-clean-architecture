import { Hateos, HateosOutputDto } from './hateos';

export interface CustomerCreateInputDto {
    document: number;
    name: string;
}

export interface CustomerUpdateInputDto {
    id: string;
    document: number;
    name: string;
}

export interface CustomerFindOneInputDto {
    device: string;
    id: string;
}

export interface CustomerOutputDto extends HateosOutputDto {
    id: string;
    document: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _links?: Hateos[];
}
