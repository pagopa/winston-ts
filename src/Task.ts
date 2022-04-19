import { flow } from "fp-ts/lib/function";
import * as T from "fp-ts/Task";
import * as w from "winston";
import { LogFunction, LogLevels, processLogFunction } from "./types/logging";

type TaskFlow<A> = (ma: T.Task<A>) => T.Task<A>;

export const log = <A>(level: LogLevels, fm: LogFunction<A>): TaskFlow<A> =>
  flow(
    T.map(item => {
      w.log(level, processLogFunction(fm, item));
      return item;
    })
  );

export const debug = <A>(fm: LogFunction<A>): TaskFlow<A> =>
  flow(log("debug", fm));

export const info = <A>(fm: LogFunction<A>): TaskFlow<A> =>
  flow(log("info", fm));

export const warn = <A>(fm: LogFunction<A>): TaskFlow<A> =>
  flow(log("warn", fm));

export const error = <A>(fm: LogFunction<A>): TaskFlow<A> =>
  flow(log("error", fm));
