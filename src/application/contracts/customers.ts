import { CustomersEntityInterface } from '@/domain/@shared/contracts';
import { VittaIntegrationInterface } from '@/framework/integrations/contracts';
import { CacheProviderInterface, TokenProviderInterface } from '@/framework/providers/contracts';
import { Hateos, HateosOutputDto, PaginationOutputDto } from './custom';

export interface CustomersCreateInputDto {
    document: number;
    name: string;
    createdAt?: Date;
}

export interface CustomersUpdateInputDto {
    id: string;
    document: number;
    name: string;
}

export interface CustomersFindOneInputDto {
    device: string;
    id: string;
}

export interface CustomersCustomOutputDto<T extends CustomersOutputDto | CustomersOutputDto[]> {
    pagination?: PaginationOutputDto;
    data: T;
    _links?: Hateos[];
}

export interface CustomersOutputDto extends HateosOutputDto {
    id: string;
    document: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _links?: Hateos[];
}

export interface CustomersRepositoryInterface {
    create?(entity: CustomersEntityInterface): Promise<CustomersEntityInterface>;
    update?(entity: CustomersEntityInterface): Promise<CustomersEntityInterface>;
    findOneById?(id: string): Promise<CustomersEntityInterface | null>;
    findOneByDocument?(document: number): Promise<CustomersEntityInterface | null>;
}

export interface CustomersUseCaseInterface {
    create?(input: CustomersCreateInputDto): Promise<CustomersCustomOutputDto<CustomersOutputDto>>;
    findOne?(input: CustomersFindOneInputDto): Promise<CustomersCustomOutputDto<CustomersOutputDto>>;
    update?(input: CustomersUpdateInputDto): Promise<CustomersCustomOutputDto<CustomersOutputDto>>;
    container?: CustomersContainerInterface;
}

export interface CustomersContainerInterface {
    repositories?: {
        customers?: CustomersRepositoryInterface;
    };
    integrations?: {
        vitta?: VittaIntegrationInterface;
    };
    providers?: {
        token?: TokenProviderInterface;
        cache?: CacheProviderInterface;
    };
}
