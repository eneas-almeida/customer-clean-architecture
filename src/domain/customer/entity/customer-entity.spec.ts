import { CustomerEntity } from './customer.entity';

describe('Customer unit tests', () => {
    it('should throw an error when the document is negative', () => {
        expect(() => {
            new CustomerEntity(null, -1, 'Tiago Rizzo');
        }).toThrowError('request inválida');
    });

    it('should throw an error when name is greater than 20', () => {
        expect(() => {
            new CustomerEntity(null, 20202020, 'Tiago Rizzo da Silva Campos Neto');
        }).toThrowError('request inválida');
    });
});
