import { HttpResponse } from '../contracts';

export const noContent = (): HttpResponse => ({
    statusCode: 204,
    body: null,
});

export const create = (body: any): HttpResponse => ({
    statusCode: 201,
    body,
});

export const ok = (body?: any): HttpResponse => ({
    statusCode: 200,
    body,
});
