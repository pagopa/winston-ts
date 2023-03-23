import {
  LogFunction,
  LoggerId,
  LogLevels,
  peek,
  Peeper
} from "./types/logging";

export const log = <A>(
  level: LogLevels,
  fm: LogFunction<A>,
  loggerId: LoggerId = LoggerId.default
): Peeper<A> => peek(level, fm, loggerId);

export const debug = <A>(fm: LogFunction<A>, loggerId?: LoggerId): Peeper<A> =>
  log("debug", fm, loggerId);

export const info = <A>(fm: LogFunction<A>, loggerId?: LoggerId): Peeper<A> =>
  log("info", fm, loggerId);

export const warn = <A>(fm: LogFunction<A>, loggerId?: LoggerId): Peeper<A> =>
  log("warn", fm, loggerId);

export const error = <A>(fm: LogFunction<A>, loggerId?: LoggerId): Peeper<A> =>
  log("error", fm, loggerId);
