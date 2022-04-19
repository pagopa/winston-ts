# @pagopa/winston-ts

fp-ts wrapper to use [winston](https://github.com/winstonjs/winston) logging library inside a pipe.

## Quick Start
The [index](./src/index.ts) define an object for each supported fp-ts monad (Option, Either, ...) implementing the relative log functions (log, tarce, info, warn and error).
A log function could be used directly in the pipe, without output changes. 

### Example
```javascript
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import * as L from "@pagopa/winston-ts";

L.useWinston(L.withConsole());  // configure the default winston tranport

pipe(
  { name: "Bob" },
  TE.right,
  L.taskEither.info("INFO!"),   // log an info if the taskEither is right
  L.taskEither.debug(i => `DEBUG ${i.name}`), // log a debug if the taskEither is right using data conteined in the monad (rigth)
  TE.chain(i => TE.left(Error(i.name))),
  L.taskEither.debugLeft(i => `DEBUG ${i}`) // log a debug if the taskEither is left using data contained in the monad (left)
);
```

## About Side-Effect
A winston logger is backed by a node stream. Each log call will be an asynchronous 'fire and forget': no further error will be throw by winston transport.

## About Azure
This logger could be used in an Azure context using the [AzureContextTransport](https://github.com/pagopa/io-functions-commons/blob/master/src/utils/logging.ts).
NB: if you use a Function App, the transport logging level must be set to [FINEST_LEVEL](./src/utils/config.ts). The final logging level will be the one set in the function host.json.

```javascript
export const run = (context: Context) => { 
...
  L.useWinston(new AzureContextTransport(() => context.log, { level: FINEST_LEVEL }));  // configure the default winston tranport
...
}
```