export interface HATEOS {
    method: string;
    url: string;
    description?: string;
    pagination?: string;
}

export interface OutputHateosDto {
    _links?: HATEOS[];
}
