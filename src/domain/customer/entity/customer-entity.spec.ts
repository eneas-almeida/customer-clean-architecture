import { Customer } from './customer.entity';

describe('Customer unit tests', () => {
    it('should throw an error when name is greater than 20', () => {
        expect(() => {
            new Customer(null, 2333412344, 'Tiago Rizzo da Silva Campos Neto');
        }).toThrowError('O nome não pode conter mais de 20 caracteres');
    });
});
