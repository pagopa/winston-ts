import { flow } from "fp-ts/lib/function";
import * as T from "fp-ts/Task";
import * as w from "winston";
import { LogFunction, LogLevels, processLogFunction } from "./types/logging";

type TaskFlow = <A>(ma: T.Task<A>) => T.Task<A>;

export const log = (level: LogLevels, fm: LogFunction): TaskFlow =>
  flow(
    T.map(item => {
      w.log(level, processLogFunction(fm, item));
      return item;
    })
  );

export const debug = (fm: LogFunction): TaskFlow => flow(log("debug", fm));

export const info = (fm: LogFunction): TaskFlow => flow(log("info", fm));

export const warn = (fm: LogFunction): TaskFlow => flow(log("warn", fm));

export const error = (fm: LogFunction): TaskFlow => flow(log("error", fm));
