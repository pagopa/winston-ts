import { flow } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { LogFunction, LoggerId, LogLevels, peek } from "./types/logging";

type TaskEitherFlow<E, A> = (ma: TE.TaskEither<E, A>) => TE.TaskEither<E, A>;

export const log = <E, A>(
  level: LogLevels,
  fm: LogFunction<A>,
  loggerId: LoggerId = LoggerId.default
): TaskEitherFlow<E, A> => flow(TE.map(peek(level, fm, loggerId)));

export const debug = <E, A>(
  fm: LogFunction<A>,
  loggerId?: LoggerId
): TaskEitherFlow<E, A> => flow(log("debug", fm, loggerId));

export const info = <E, A>(
  fm: LogFunction<A>,
  loggerId?: LoggerId
): TaskEitherFlow<E, A> => flow(log("info", fm, loggerId));

export const warn = <E, A>(
  fm: LogFunction<A>,
  loggerId?: LoggerId
): TaskEitherFlow<E, A> => flow(log("warn", fm, loggerId));

export const error = <E, A>(
  fm: LogFunction<A>,
  loggerId?: LoggerId
): TaskEitherFlow<E, A> => flow(log("error", fm, loggerId));

export const logLeft = <E, A>(
  level: LogLevels,
  fm: LogFunction<E>,
  loggerId: LoggerId = LoggerId.default
): TaskEitherFlow<E, A> => flow(TE.mapLeft(peek(level, fm, loggerId)));

export const debugLeft = <E, A>(
  fm: LogFunction<E>,
  loggerId?: LoggerId
): TaskEitherFlow<E, A> => flow(logLeft("debug", fm, loggerId));

export const infoLeft = <E, A>(
  fm: LogFunction<E>,
  loggerId?: LoggerId
): TaskEitherFlow<E, A> => flow(logLeft("info", fm, loggerId));

export const warnLeft = <E, A>(
  fm: LogFunction<E>,
  loggerId?: LoggerId
): TaskEitherFlow<E, A> => flow(logLeft("warn", fm, loggerId));

export const errorLeft = <E, A>(
  fm: LogFunction<E>,
  loggerId?: LoggerId
): TaskEitherFlow<E, A> => flow(logLeft("error", fm, loggerId));
