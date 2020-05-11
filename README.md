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

[Picpay](https://app.picpay.com/user/flavio.takeuchi)

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
