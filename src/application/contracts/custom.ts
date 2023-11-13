export interface FilterInputDto {
    query?: any;
    limit?: number;
    skip?: number;
    page?: number;
    sort?: any;
}

export interface Hateos {
    method: string;
    url: string;
    description?: string;
}

export interface HateosOutputDto {
    _links?: {
        method: string;
        url: string;
        description?: string;
    }[];
}

export interface PaginationOutputDto {
    page: number;
    limit: number;
    total: number;
    pages: number;
    offset: number;
    hasNext: boolean;
    hasPrevious: boolean;
    next: number | null;
    previous: number | null;
}
