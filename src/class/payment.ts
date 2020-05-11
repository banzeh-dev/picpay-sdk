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

    constructor(params: ConstructorInterface) {
        this.params = params;
    }

    public request(request: PaymentRequestInterface): Promise<PaymentResponseInterface> {
        return new Promise<PaymentResponseInterface>((resolve, reject) => {
            const util = new Utils(this.params);
            const options: IHttpRequestOptions = util.getHttpRequestOptions({
                method: HttpRequestMethodEnum.POST,
                path: "/ecommerce/public/payments",
                hostname: "appws.picpay.com"
            });

            util.httpRequest(options, request)
                .then((response) => resolve(response.data as PaymentResponseInterface))
                .catch((err) => reject(err as ResponseErrorInterface));
        })
    }

    public cancel(params: CancelRequestInterface): Promise<CancelResponseInterface> {
        return new Promise<CancelResponseInterface>((resolve, reject) => {
            const util = new Utils(this.params);
            const options: IHttpRequestOptions = util.getHttpRequestOptions({
                method: HttpRequestMethodEnum.POST,
                path: encodeURI(`/ecommerce/public/payments/${params.referenceId}/cancellations`),
                hostname: "appws.picpay.com"
            });

            const request = params.authorizationId ? { authorizationId: params.authorizationId } : {};

            util.httpRequest(options, request)
                .then((response) => resolve(response.data as CancelResponseInterface))
                .catch((err) => reject(err as ResponseErrorInterface));
        })
    }

    public status(params: StatusRequestInterface): Promise<StatusResponseInterface> {
        if (!this.params.sellerToken) {
            return Promise.reject({
                message: 'Seller token não foi informado',
            } as ResponseErrorInterface);
        }

        return new Promise<StatusResponseInterface>((resolve, reject) => {
            const util = new Utils(this.params);
            const options: IHttpRequestOptions = util.getHttpRequestOptions({
                method: HttpRequestMethodEnum.GET,
                path: encodeURI(`/ecommerce/public/payments/${params.referenceId}/status`),
                hostname: "appws.picpay.com"
            });

            util.httpRequest(options, {})
                .then((response) => resolve(response.data as StatusResponseInterface))
                .catch((err) => reject(err as ResponseErrorInterface));
        })
    }
}
