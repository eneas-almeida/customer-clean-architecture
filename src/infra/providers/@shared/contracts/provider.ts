export interface PaymentProviderInterface {
    pay(amount: number): Promise<number>;
}

export interface ShippingProviderInterface {
    calculate(amount: number): Promise<number>;
}

export interface ProviderInterface {
    payment?: PaymentProviderInterface;
    shipping?: ShippingProviderInterface;
}
