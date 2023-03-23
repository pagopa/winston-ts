# @pagopa/winston-ts

fp-ts wrapper to use [winston](https://github.com/winstonjs/winston) logging library inside a pipe.

## Quick Start
The [index](./src/index.ts) define an object for each supported fp-ts monad (Option, Either, Task and TaskEither) implementing log functions for it (log, trace, info, warn and error).
A log function could be used directly in the pipe, without output changes. 

### Example
```javascript
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { defaultLog, useWinston, withConsole } from "@pagopa/winston-ts";

useWinston(withConsole());  // configure the default winston tranport

pipe(
  { name: "Queen" },
  TE.right,
  defaultLog.taskEither.info("INFO!"),   // log an info if the taskEither is right
  defaultLog.taskEither.debug(i => `DEBUG ${i.name}`), // log a debug if the taskEither is right using data conteined in the monad (rigth)
  TE.chain(i => TE.left(Error(i.name))),
  defaultLog.taskEither.debugLeft(i => `DEBUG ${i}`) // log a debug if the taskEither is left using data contained in the monad (left)
);
```
## How to log 
winston-ts will allow you to use a configured logger within an fp-ts pipe without altering its input/output flow. \
To log a message you need to specify:
- which logger you want to use, using a [LoggerId](./src/types/logging.ts)
- which fp-ts monad you are working with
- the logger params (see below)

The syntax used is `<logger id>.<monad type>.<log function>(<logger params>)`
```javascript
defaultLog.task.info("Don't STOP me NOW!");   // log an info with message 'Don't STOP me NOW!' on the 'default' logger when the promise pointed in the task is resolved

pipe(
  "NOW",
  T.of,
  defaultLog.task.info(a -> `Don't STOP me ${a}!`),   // log an info with message 'Don't STOP me NOW!' on the 'default' logger when the promise pointed in the task is resolved
);
```
#### Log without a monad
The special monad type `peek` allow you to log directly using an object instead of a monad.\
This is useful when we are still constructing our input.
```javascript
pipe(
  "NOW",
  defaultLog.peek.info(`Don't STOP me ${a}!`), // log an info with message 'Don't STOP me NOW!' on the 'default' logger
);
```

### Logger params
Each logger function support differents inputs:
- string
- tuple of 2 elements (a string and an unknown object)
- a function with arity 1 and returning a string
- a function with arity 1 and rutirning a tuple of 2 elements (a string and an unknown object)
#### String input
A logger with a `string` input, will direct used as message log. \
The string will be provide to the transport as `message` parameter.
```javascript
defaultLog.task.info("Don't STOP me NOW!");
// Output
// {message: "Don't STOP me NOW!"}
```
#### Tuple of 2 elements
A logger with a tuple `[string, unknown]` as input, will use the string as message and the unknown object fields will be used as [meta parameters](https://github.com/winstonjs/winston#streams-objectmode-and-info-objects). \
The transport will receive the string as `message`, the unknown object fields deconstructed as `meta`.
```javascript
defaultLog.task.info(["Don't STOP me NOW!", {galileo: "magnificooooo ", under: "pressure"}]);
// Output
// {message: "Don't STOP me NOW!", galileo: "magnificooooo ", under: "pressure"}
```
#### Function with arity 1 and returning a string
A logger with a function `(a) -> string` as input, will execute the function providing the value wrapped by the monad as input, and use the output string as explained above ([String input](#string-input)). 
```javascript
pipe(
  "NOW",
  T.of,
  defaultLog.task.info(a -> `Don't STOP me ${a}!`),
);
// Output
// {message: "Don't STOP me NOW!"}
```
#### Function with arity 1 and returning a tuple of 2 elements
A logger with a function `(a) -> [string, unknown]` as input, will execute the function providing the value wrapped by the monad as input, and use the output tuple as explained above ([Tupla of 2 elements](#tupla-of-2-elements)). 
```javascript
pipe(
  "NOW",
  T.of,
  defaultLog.task.info(a -> [`Don't STOP me ${a}!`, {galileo: "magnificooooo ", under: "pressure"]),
);
// Output
// {message: "Don't STOP me NOW!", galileo: "magnificooooo ", under: "pressure"}
```
## Configure
winston-ts use the [winston Container](https://github.com/winstonjs/winston/tree/v3.8.2#working-with-multiple-loggers-in-winston) to configure one or more logger. \
The utility [useWinstonFor()](./src/utils/config.ts) allow you to configure and map it to be used with a specific logger type. \
NB: Each logger must be mapped with a [LoggerId](./src/types/logging.ts): this will limit the maximum number of configured logger at time.
```javascript
  useWinstonFor({
                loggerId: LoggerId.default,   // the type of the logger
                transports: withConsole()     // the transports used to logging
                }); 
  ...
  pipe("", defaultLog.peek.info("Don't STOP me NOW!"));
```
### Multiple logs with a single log call
You can configure multiple transports within a single logger: in this way, when calling a log function on the mapped loggerId, the message will be processed by all the transports.
```javascript
useWinstonFor({
                loggerId: LoggerId.event,
                transports: [
                withConsole(),
                withConsole()
                ]
              });
useWinstonFor({
                loggerId: LoggerId.default,
                transports: [withConsole()]
              });
...
  pipe("", defaultLog.peek.info("Don't STOP me NOW! on default logger"));
  // Output:
  // {message: "Don't STOP me NOW! on default logger"}

  pipe("", eventLog.peek.info("Don't STOP me NOW! on event logger"));
  // Output:
  // {message: "Don't STOP me NOW! on event logger"}
  // {message: "Don't STOP me NOW! on event logger"}
```

## About Side-Effect
A winston logger is backed by a node stream. Each log call will be an asynchronous 'fire and forget': no further error will be throw by winston transport.

## About Azure
This logger could be used with:
- Azure Application Insight using the [ApplicationInsightTransport](https://github.com/pagopa/io-functions-commons/blob/v27.6.0/src/utils/transports/application_insight.ts).\
NB: this transport will log in the Applicaiton Insight properties all the parameters given to logging function (not only the message string).
```javascript
export const run = (context: Context) => { 
...
  useWinston(withApplicationInsight(telemetryClient));  // configure the default winston tranport
...
}
```

- Azure function context using the [AzureContextTransport](https://github.com/pagopa/io-functions-commons/tree/v27.6.0/src/utils/logging.ts).\
NB: if you use a Function App, the transport logging level must be set to [FINEST_LEVEL](./src/utils/config.ts). The final logging level will be the one set in the function host.json.

```javascript
export const run = (context: Context) => { 
...
  useWinston(new AzureContextTransport(() => context.log, { level: FINEST_LEVEL }));  // configure the default winston tranport
...
}
```
