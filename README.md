# picpay-sdk

Client de integração com PicPay

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

## Índice

#### [Início](#instalacao)
+ [Instalação](#instalacao)
+ [Como Utilizar](#howuse)
+ [Paramêtros de criação](#params)

#### [Fazendo uma requisição](#request)
#### [Fazendo uma consulta de status](#status)
#### [Fazendo um cancelamento](#cancel)

#### [API Reference](#apiReference)
#### [Autor](#autor)
#### [License](#license)

## <a name="instalacao"></a> Instalando o pacote
```js
npm install --save picpay-sdk
```

## <a name="howuse"></a> Como utilizar?

### Iniciando
```ts
import { ConstructorInterface, Picpay } from 'picpay-sdk';

const constructorInterface: ConstructorInterface = {
    picpayToken: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    sellerToken: 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy'
}

const picpay = new Picpay(constructorInterface);
```

### <a name="params"></a> Paramêtros de criação

| Campo | Descrição | Obrigatório? | Default |
| :-------------: |:-------------:| :-----:| :-----:|
| picpayToken | token gerado e fornecido pelo PicPay | Sim | null |
| sellerToken | token gerado e fornecido pelo PicPay | Não | null |

### <a name="#request"></a> Fazendo uma requisição

```ts
const requestParams: PaymentRequestInterface = {
    buyer: {
        document: '12345678909',
        email: 'email@gmail.com',
        firstName: 'Flavio',
        lastName: 'Takeuchi',
        phone: '+5511912345678',
    },
    value: 7.36,
    referenceId: 'compra-abcd',
    callbackUrl: 'https://callback',
};

picpay.payment.request(requestParams)
    .then((response: PaymentResponseInterface) => {
        ...
    })
    .catch((err) => {
        (err as ResponseErrorInterface).message;
    })
```

### <a name="#status"></a> Fazendo uma consulta de status

```ts
const statusRequest: StatusRequestInterface = {
    referenceId: 'compra-abcd',
}

picpay.payment.status(statusRequest)
    .then((response: StatusResponseInterface) => {
        ...
    })
    .catch((err) => {
        (err as ResponseErrorInterface).message;
    })
```

### <a name="#cancel"></a> Fazendo um cancelamento

```ts
const cancelarParams: CancelRequestInterface = {
    referenceId: 'compra-abcd',
};

picpay.payment.cancel(cancelarParams)
    .then((response: CancelResponseInterface) => {
        ...
    })
    .catch((err) => {
        (err as ResponseErrorInterface).message;
    })
```

## <a name="apiReference"></a> API Reference

Consulte os campos necessários na documentação da PicPay

[PT-Br](https://ecommerce.picpay.com/doc/#)

## <a name="autor"></a> Autor

Flavio Takeuchi <[flavio@banzeh.com.br](mailto:flavio@banzeh.com.br)>

[Github](https://github.com/banzeh)

[Twitter](http://twitter.com/banzeh)

![donate](data:image/jpeg;base64,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)
![picpay](data:image/png;base64,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)

## <a name="license"></a> License

MIT License

Copyright (c) 2017 banzeh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
