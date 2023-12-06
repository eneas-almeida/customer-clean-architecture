import { CustomersEntityInterface } from '@/domain/@shared/contracts';
import { EntityAbstract } from '@/domain/@shared/entity';
import { CustomersValidatorFactory } from '../factory';

export class CustomersEntity extends EntityAbstract implements CustomersEntityInterface {
    private _name: string;
    private _document: number;

    constructor(id: string, document: number, name: string, createdAt: Date) {
        super(id, createdAt);
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
        CustomersValidatorFactory.create().validate(this);
    }
}
