export interface Hateos {
    method: string;
    url: string;
    description?: string;
    pagination?: string;
}

export interface HateosOutputDto {
    _links?: Hateos[];
}
