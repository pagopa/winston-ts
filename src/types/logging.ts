import { pipe } from "fp-ts/lib/function";
import * as w from "winston";

export type LogLevels = "debug" | "info" | "warn" | "error";

export enum LoggerId {
  console = "console",
  context = "context",
  default = "default",
  event = "event"
}

export type LogFunction<A> =
  | string
  | readonly [string, unknown]
  | ((a: A) => string | readonly [string, unknown]);

export const processLogFunction = <A>(
  fm: LogFunction<A>,
  item: A
): readonly [string, unknown] =>
  pipe(fm instanceof Function ? fm(item) : fm, message =>
    typeof message === "string" ? [message, undefined] : message
  );

type Peeper<A> = (item: A) => A;
export const peek = <A>(
  level: LogLevels,
  fm: LogFunction<A>,
  loggerId: string
): Peeper<A> => (item: A): ReturnType<Peeper<A>> => {
  const [message, meta] = processLogFunction(fm, item);
  w.loggers.get(loggerId).log(level, message, meta);
  return item;
};
