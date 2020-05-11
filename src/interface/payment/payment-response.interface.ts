export interface Qrcode {
    content: string;
    base64: string;
}

export interface PaymentResponseInterface {
    referenceId: string;
    paymentUrl: string;
    expiresAt: Date;
    qrcode: Qrcode;
}
