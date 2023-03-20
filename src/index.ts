/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as O from "./Option";
import * as T from "./Task";
import * as E from "./Either";
import * as TE from "./TaskEither";
import { LogFunction, LoggerId, LogLevels } from "./types/logging";

const init = (loggerId: LoggerId) => ({
  either: {
    debug: <E, A>(fm: LogFunction<A>) => E.debug<E, A>(fm, loggerId),
    debugLeft: <E, A>(fm: LogFunction<E>) => E.debugLeft<E, A>(fm, loggerId),
    error: <E, A>(fm: LogFunction<A>) => E.error<E, A>(fm, loggerId),
    errorLeft: <E, A>(fm: LogFunction<E>) => E.errorLeft<E, A>(fm, loggerId),
    info: <E, A>(fm: LogFunction<A>) => E.info<E, A>(fm, loggerId),
    infoLeft: <E, A>(fm: LogFunction<E>) => E.infoLeft<E, A>(fm, loggerId),
    log: <E, A>(level: LogLevels, fm: LogFunction<A>) =>
      E.log<E, A>(level, fm, loggerId),
    logLeft: <E, A>(level: LogLevels, fm: LogFunction<E>) =>
      E.logLeft<E, A>(level, fm, loggerId),
    warn: <E, A>(fm: LogFunction<A>) => E.warn<E, A>(fm, loggerId),
    warnLeft: <E, A>(fm: LogFunction<E>) => E.warnLeft<E, A>(fm, loggerId)
  },
  option: {
    debug: <A>(fm: LogFunction<A>) => O.debug(fm, loggerId),
    debugNone: <A>(fm: LogFunction<undefined>) => O.debugNone<A>(fm, loggerId),
    error: <A>(fm: LogFunction<A>) => O.error(fm, loggerId),
    errorNone: <A>(fm: LogFunction<undefined>) => O.errorNone<A>(fm, loggerId),
    info: <A>(fm: LogFunction<A>) => O.info(fm, loggerId),
    infoNone: <A>(fm: LogFunction<undefined>) => O.infoNone<A>(fm, loggerId),
    log: <A>(level: LogLevels, fm: LogFunction<A>) =>
      O.log(level, fm, loggerId),
    logNone: <A>(level: LogLevels, fm: LogFunction<undefined>) =>
      O.logNone<A>(level, fm, loggerId),
    warn: <A>(fm: LogFunction<A>) => O.warn(fm, loggerId),
    warnNone: <A>(fm: LogFunction<undefined>) => O.warnNone<A>(fm, loggerId)
  },
  task: {
    debug: <A>(fm: LogFunction<A>) => T.debug(fm, loggerId),
    error: <A>(fm: LogFunction<A>) => T.error(fm, loggerId),
    info: <A>(fm: LogFunction<A>) => T.info(fm, loggerId),
    log: <A>(level: LogLevels, fm: LogFunction<A>) =>
      T.log(level, fm, loggerId),
    warn: <A>(fm: LogFunction<A>) => T.warn(fm, loggerId)
  },
  taskEither: {
    debug: <E, A>(fm: LogFunction<A>) => TE.debug<E, A>(fm, loggerId),
    debugLeft: <E, A>(fm: LogFunction<E>) => TE.debugLeft<E, A>(fm, loggerId),
    error: <E, A>(fm: LogFunction<A>) => TE.error<E, A>(fm, loggerId),
    errorLeft: <E, A>(fm: LogFunction<E>) => TE.errorLeft<E, A>(fm, loggerId),
    info: <E, A>(fm: LogFunction<A>) => TE.info<E, A>(fm, loggerId),
    infoLeft: <E, A>(fm: LogFunction<E>) => TE.infoLeft<E, A>(fm, loggerId),
    log: <E, A>(level: LogLevels, fm: LogFunction<A>) =>
      TE.log<E, A>(level, fm, loggerId),
    logLeft: <E, A>(level: LogLevels, fm: LogFunction<E>) =>
      TE.logLeft<E, A>(level, fm, loggerId),
    warn: <E, A>(fm: LogFunction<A>) => TE.warn<E, A>(fm, loggerId),
    warnLeft: <E, A>(fm: LogFunction<E>) => TE.warnLeft<E, A>(fm, loggerId)
  }
});

export const defaultLog = init(LoggerId.default);
export const contextLog = init(LoggerId.context);
export const consoleLog = init(LoggerId.console);
export const eventLog = init(LoggerId.event);

export {
  useWinston,
  useWinstonFor,
  withConsole,
  FINEST_LEVEL
} from "./utils/config";
