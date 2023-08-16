export interface HATEOS {
    method: string;
    url: string;
    description?: string;
    pagination?: string;
}

export interface OutputDtoInterface {
    _links?: HATEOS[];
}
