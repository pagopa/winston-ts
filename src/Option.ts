import * as O from "fp-ts/Option";
import { flow, pipe } from "fp-ts/lib/function";
import { LogFunction, LoggerId, LogLevels, peek } from "./types/logging";

type OptionFlow<A> = (fa: O.Option<A>) => O.Option<A>;

export const log = <A>(
  level: LogLevels,
  fm: LogFunction<A>,
  loggerId: LoggerId = LoggerId.default
): OptionFlow<A> => flow(O.map(peek(level, fm, loggerId)));

export const debug = <A>(
  fm: LogFunction<A>,
  loggerId?: LoggerId
): OptionFlow<A> => flow(log("debug", fm, loggerId));

export const info = <A>(
  fm: LogFunction<A>,
  loggerId?: LoggerId
): OptionFlow<A> => flow(log("info", fm, loggerId));

export const warn = <A>(
  fm: LogFunction<A>,
  loggerId?: LoggerId
): OptionFlow<A> => flow(log("warn", fm, loggerId));

export const error = <A>(
  fm: LogFunction<A>,
  loggerId?: LoggerId
): OptionFlow<A> => flow(log("error", fm, loggerId));

export const logNone = <A>(
  level: LogLevels,
  fm: LogFunction<undefined>,
  loggerId: LoggerId = LoggerId.default
) => (fa: O.Option<A>): O.Option<A> =>
  pipe(
    fa,
    O.alt(() => {
      peek(level, fm, loggerId)(undefined);
      return fa;
    })
  );

export const debugNone = <A>(
  fm: LogFunction<undefined>,
  loggerId?: LoggerId
): OptionFlow<A> => flow(logNone("debug", fm, loggerId));

export const infoNone = <A>(
  fm: LogFunction<undefined>,
  loggerId?: LoggerId
): OptionFlow<A> => flow(logNone("info", fm, loggerId));

export const warnNone = <A>(
  fm: LogFunction<undefined>,
  loggerId?: LoggerId
): OptionFlow<A> => flow(logNone("warn", fm, loggerId));

export const errorNone = <A>(
  fm: LogFunction<undefined>,
  loggerId?: LoggerId
): OptionFlow<A> => flow(logNone("error", fm, loggerId));
