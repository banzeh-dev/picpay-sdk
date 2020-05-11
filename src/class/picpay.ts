import { Payment } from './payment';
import { ConstructorInterface } from "../interface";

export class Picpay {
    public payment: Payment;

    constructor(params: ConstructorInterface) {
        this.payment = new Payment(params);
    }
}