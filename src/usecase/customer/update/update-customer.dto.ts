export interface InputUpdateCustomerDto {
    id: string;
    document: number;
    name: string;
}

export interface OutputUpdateCustomerDto {
    id: string;
    document: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
