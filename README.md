# Angular Fun

## Development

### Build frontend

```npm run build```

### Run server

```npm start```

A ```server/config.js``` file must be written. The file must export an object with the following properties :
* ```api_key```: the API key of Cleverbot (string);
* ```session_secret```: the secret used by express-session (string).

### Run linter

```npm run lint```

### Run tests

```npm run test``` for unit tests.

```npm run e2e``` for e2e tests.
