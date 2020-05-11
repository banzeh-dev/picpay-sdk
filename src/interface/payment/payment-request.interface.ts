export interface Buyer {
    firstName: string;
    lastName: string;
    document: string;
    email: string;
    phone: string;
}

export interface PaymentRequestInterface {
    referenceId: string;
    callbackUrl: string;
    returnUrl?: string;
    value: number;
    expiresAt?: Date;
    buyer: Buyer;
}
