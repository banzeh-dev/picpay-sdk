import { IncomingMessage } from 'http';
import { request, RequestOptions } from 'https';
import { ConstructorInterface, ResponseErrorInterface } from '../interface';

export class Utils {
  private params: ConstructorInterface;

  constructor(params: ConstructorInterface) {
    this.params = params;
  }

  public getHttpRequestOptions(params: { hostname: string, path: string, method: HttpRequestMethodEnum }): IHttpRequestOptions {
    return {
      method: params.method,
      path: params.path,
      hostname: params.hostname,
      port: 443,
      encoding: "utf-8",
      headers: {
        'x-picpay-token': this.params.picpayToken,
        "Content-Type": "application/json",
      },
    } as IHttpRequestOptions;
  }

  private parseHttpRequestError(options: IHttpRequestOptions, data: string, response: any): IHttpRequestReject {
    return {
      statusCode: response.statusCode || '',
      request: JSON.stringify(data).toString(),
      response
    } as IHttpRequestReject;
  }

  private parseHttpPutResponse(response: IncomingMessage): IHttpResponse {
    return {
      statusCode: response.statusCode || 0,
      statusMessage: response.statusMessage || '',
    }
  }

  public request<T, U>(options: IHttpRequestOptions, data: U): Promise<T> {
    return  new Promise((resolve, reject) => {
      this.httpRequest(options, data)
        .then((response) => {
          const data = response.data ? response.data : {};
          resolve(data as T)
        })
        .catch((reject) => reject as ResponseErrorInterface);
    })
  }

  public httpRequest(options: IHttpRequestOptions, data: any): Promise<IHttpResponse> {
    // console.log('DEBUG UTILS', JSON.stringify(options, null, '\t'), JSON.stringify(data, null, '\t'))

    const dataPost = JSON.stringify(data).normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    return new Promise<IHttpResponse>((resolve, reject) => {
      if (options && options.headers)
        options.headers['Content-Length'] = Buffer.byteLength(dataPost)
      const req = request(options, (res: IncomingMessage) => {
        var chunks: string = '';
        res.on('data', (chunk: any) => chunks += chunk);
    
        res.on('end', () => {
          const response = (chunks.length > 0 && this.validateJSON(chunks)) ? JSON.parse(chunks) : '';
          if (res.statusCode && [200, 201].indexOf(res.statusCode) === -1) return reject(this.parseHttpRequestError(options, data, response));
          if (options.method === 'PUT' && chunks.length === 0) return resolve(this.parseHttpPutResponse(res));
          return resolve({
            ...this.parseHttpPutResponse(res),
            data: response
          })
        });
      });

      req.write(dataPost)
      req.on('error', (err) => reject(err))
      req.end()
    });
  }
  
  public validateJSON(text: string): boolean {
    return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
      text.replace(/"(\\.|[^"\\])*"/g, ''))) &&
      eval('(' + text + ')');	
  }
}


export enum HttpRequestMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT'
}

export interface IHttpRequestOptions extends RequestOptions {
  method: HttpRequestMethodEnum;
  path: string;
  hostname: string;
  headers: any;
  encoding: string;
  port: number;
}

export interface IHttpRequestReject {
  statusCode: string;
  request: string;
  response: IncomingMessage;
}

/**
 * Interface com dados que serão retornados em todas as requisições
 */
export interface IHttpResponse {
  statusCode: number;
  statusMessage: string;
  data?: any;
}
