import * as O from "fp-ts/Option";
import { flow, pipe } from "fp-ts/lib/function";
import * as w from "winston";
import { LogFunction, LogLevels, processLogFunction } from "./types/logging";

type OptionFlow = <A>(fa: O.Option<A>) => O.Option<A>;

export const log = (level: LogLevels, fm: LogFunction): OptionFlow =>
  flow(
    O.map(item => {
      w.log(level, processLogFunction(fm, item));
      return item;
    })
  );

export const debug = (fm: LogFunction): OptionFlow => flow(log("debug", fm));

export const info = (fm: LogFunction): OptionFlow => flow(log("info", fm));

export const warn = (fm: LogFunction): OptionFlow => flow(log("warn", fm));

export const error = (fm: LogFunction): OptionFlow => flow(log("error", fm));

export const logNone = <A>(level: LogLevels, fm: LogFunction) => (
  fa: O.Option<A>
): O.Option<A> =>
  pipe(
    fa,
    O.alt(() => {
      w.log(level, processLogFunction(fm, undefined));
      return fa;
    })
  );

export const debugNone = (fm: LogFunction): OptionFlow =>
  flow(logNone("debug", fm));

export const infoNone = (fm: LogFunction): OptionFlow =>
  flow(logNone("info", fm));

export const warnNone = (fm: LogFunction): OptionFlow =>
  flow(logNone("warn", fm));

export const errorNone = (fm: LogFunction): OptionFlow =>
  flow(logNone("error", fm));
