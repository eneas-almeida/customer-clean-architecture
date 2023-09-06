import { HttpResponse } from '../contracts';
import { ServerError, UnauthorizedError } from '../errors';

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(error.stack),
});

export const forbidden = (error: Error): HttpResponse => ({
    statusCode: 403,
    body: error,
});

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError(),
});

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error,
});

export const noContent = (): HttpResponse => ({
    statusCode: 204,
    body: null,
});

export const create = (body: any): HttpResponse => ({
    statusCode: 201,
    body,
});

export const ok = (body: any): HttpResponse => ({
    statusCode: 200,
    body,
});
