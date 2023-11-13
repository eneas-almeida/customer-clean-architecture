import { envs } from '@/main/configs';
import { api } from '@/main/utils';
import { CustomersCustomOutputDto, CustomersOutputDto } from '../contracts';

export const customOutputDto = <T extends CustomersOutputDto | CustomersOutputDto[]>(
    data: T
): CustomersCustomOutputDto<T> => {
    const output: CustomersCustomOutputDto<T> = {
        data,
    };

    if (data instanceof Array) {
        output.pagination = {
            page: 0,
            limit: 0,
            total: 0,
            pages: 0,
            offset: 0,
            hasNext: false,
            hasPrevious: false,
            next: null,
            previous: null,
        };
    }

    if (envs.api.hateosActivated) {
        const url = `${api}/customers`;

        output._links = [
            { method: 'post', url, description: 'Create a new customer' },
            { method: 'get', url, description: 'Filters customers' },
            { method: 'get', url: `${url}/:id`, description: 'Find a customer by id' },
        ];
    }

    return output;
};

export const outputFilterDto = <T>(input: T): T => {
    return { ...input };
};
