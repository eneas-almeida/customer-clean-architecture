export interface InputCreateCustomerDto {
    document: number;
    name: string;
}

export interface OutputCreateCustomerDto {
    id: string;
    document: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
