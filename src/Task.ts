import { flow } from "fp-ts/lib/function";
import * as T from "fp-ts/Task";
import { LogFunction, LoggerId, LogLevels, peek } from "./types/logging";

type TaskFlow<A> = (ma: T.Task<A>) => T.Task<A>;

export const log = <A>(
  level: LogLevels,
  fm: LogFunction<A>,
  loggerId: LoggerId = LoggerId.default
): TaskFlow<A> => flow(T.map(peek(level, fm, loggerId)));

export const debug = <A>(
  fm: LogFunction<A>,
  loggerId?: LoggerId
): TaskFlow<A> => flow(log("debug", fm, loggerId));

export const info = <A>(fm: LogFunction<A>, loggerId?: LoggerId): TaskFlow<A> =>
  flow(log("info", fm, loggerId));

export const warn = <A>(fm: LogFunction<A>, loggerId?: LoggerId): TaskFlow<A> =>
  flow(log("warn", fm, loggerId));

export const error = <A>(
  fm: LogFunction<A>,
  loggerId?: LoggerId
): TaskFlow<A> => flow(log("error", fm, loggerId));
