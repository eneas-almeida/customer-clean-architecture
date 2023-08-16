import { CustomerInterface } from '@/domain/@shared/contracts';
import { Entity } from '@/domain/@shared/entity/entity.abstract';
import { Id } from '@/domain/@shared/types/id.type';
import { CustomerValidatorFactory } from '../factory/customer-validator.factory';

export class Customer extends Entity implements CustomerInterface {
    private _name: string;
    private _document: number;

    constructor(id: Id, document: number, name: string) {
        super(id);
        this._document = document;
        this._name = name;
        this.validate();
    }

    get document(): number {
        return this._document;
    }

    setDocument(value: number): void {
        this._document = value;
    }

    get name(): string {
        return this._name;
    }

    setName(value: string): void {
        this._name = value;
    }

    validate() {
        CustomerValidatorFactory.create().validate(this);
    }
}
