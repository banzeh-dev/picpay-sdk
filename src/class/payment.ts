import { Utils, IHttpRequestOptions, HttpRequestMethodEnum } from "./utils";
import {
    ConstructorInterface,
    PaymentRequestInterface,
    PaymentResponseInterface,
    CancelRequestInterface,
    CancelResponseInterface,
    ResponseErrorInterface,
    StatusRequestInterface,
    StatusResponseInterface
} from "../interface";

export class Payment {
    private params: ConstructorInterface;
    private util: Utils;
    private hostname: string = 'appws.picpay.com';

    constructor(params: ConstructorInterface) {
        this.params = params;
        this.util = new Utils(this.params);
    }

    public request(request: PaymentRequestInterface): Promise<PaymentResponseInterface> {
        return new Promise<PaymentResponseInterface>((resolve, reject) => {
            const options: IHttpRequestOptions = this.util.getHttpRequestOptions({
                method: HttpRequestMethodEnum.POST,
                path: "/ecommerce/public/payments",
                hostname: this.hostname
            });

            this.util.request<PaymentResponseInterface, PaymentRequestInterface>(options, request)
        })
    }

    public cancel(params: CancelRequestInterface): Promise<CancelResponseInterface> {
        return new Promise<CancelResponseInterface>((resolve, reject) => {
            const options: IHttpRequestOptions = this.util.getHttpRequestOptions({
                method: HttpRequestMethodEnum.POST,
                path: encodeURI(`/ecommerce/public/payments/${params.referenceId}/cancellations`),
                hostname: this.hostname
            });

            const request = params.authorizationId ? { authorizationId: params.authorizationId } : {};

            this.util.request<CancelResponseInterface, CancelRequestInterface | {}>(options, request)
        })
    }

    public status(params: StatusRequestInterface): Promise<StatusResponseInterface> {
        if (!this.params.sellerToken) {
            return Promise.reject({
                message: 'Seller token não foi informado',
            } as ResponseErrorInterface);
        }

        return new Promise<StatusResponseInterface>((resolve, reject) => {
            const options: IHttpRequestOptions = this.util.getHttpRequestOptions({
                method: HttpRequestMethodEnum.GET,
                path: encodeURI(`/ecommerce/public/payments/${params.referenceId}/status`),
                hostname: this.hostname,
            });

            this.util.request<StatusResponseInterface, {}>(options, {});
        })
    }
}
