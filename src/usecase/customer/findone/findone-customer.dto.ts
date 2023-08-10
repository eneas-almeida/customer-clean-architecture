export interface InputFindOneCustomerDto {
    id: string;
}

export interface OutputFindOneCustomerDto {
    id: string;
    document: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
