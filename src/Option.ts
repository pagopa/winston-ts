import * as O from "fp-ts/Option";
import { flow, pipe } from "fp-ts/lib/function";
import { LogFunction, LogLevels, peek } from "./types/logging";

type OptionFlow<A> = (fa: O.Option<A>) => O.Option<A>;

export const log = <A>(level: LogLevels, fm: LogFunction<A>): OptionFlow<A> =>
  flow(O.map(peek(level, fm)));

export const debug = <A>(fm: LogFunction<A>): OptionFlow<A> =>
  flow(log("debug", fm));

export const info = <A>(fm: LogFunction<A>): OptionFlow<A> =>
  flow(log("info", fm));

export const warn = <A>(fm: LogFunction<A>): OptionFlow<A> =>
  flow(log("warn", fm));

export const error = <A>(fm: LogFunction<A>): OptionFlow<A> =>
  flow(log("error", fm));

export const logNone = <A>(level: LogLevels, fm: LogFunction<undefined>) => (
  fa: O.Option<A>
): O.Option<A> =>
  pipe(
    fa,
    O.alt(() => {
      peek(level, fm)(undefined);
      return fa;
    })
  );

export const debugNone = <A>(fm: LogFunction<undefined>): OptionFlow<A> =>
  flow(logNone("debug", fm));

export const infoNone = <A>(fm: LogFunction<undefined>): OptionFlow<A> =>
  flow(logNone("info", fm));

export const warnNone = <A>(fm: LogFunction<undefined>): OptionFlow<A> =>
  flow(logNone("warn", fm));

export const errorNone = <A>(fm: LogFunction<undefined>): OptionFlow<A> =>
  flow(logNone("error", fm));