# jups-body-json

[![NPM Version](https://img.shields.io/npm/v/@jups/body-json.svg)](https://npmjs.org/package/@jups/body-json)
[![NPM Downloads](https://img.shields.io/npm/dm/@jups/body-json.svg)](https://npmcharts.com/compare/@jups/body-json?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=@jups/body-json)](https://packagephobia.now.sh/result?p=@jups/body-json)

An extension for the jups package for parsing JSON body data.

## Installation

```bash
npm i @jups/body-json
```

## Usage

```js
const jups = require('jups');
const bodyJSON = require('@jups/body-json');

jups()
    .use(bodyJSON)
    .post('/', (req, res) => {
        res.end(req.body.name);
    })
    .listen(3000);
```

For Typescript just use the following import syntax.

```ts
import bodyJSON from '@jups/body-json';
```
