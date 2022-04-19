import { flow } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import * as w from "winston";
import { LogFunction, LogLevels, processLogFunction } from "./types/logging";

type TaskEitherFlow<E, A> = (ma: TE.TaskEither<E, A>) => TE.TaskEither<E, A>;

export const log = <E, A>(
  level: LogLevels,
  fm: LogFunction<A>
): TaskEitherFlow<E, A> =>
  flow(
    TE.map(item => {
      w.log(level, processLogFunction(fm, item));
      return item;
    })
  );

export const debug = <E, A>(
  fm: ((a: A) => string) | string
): TaskEitherFlow<E, A> => flow(log("debug", fm));

export const info = <E, A>(fm: LogFunction<A>): TaskEitherFlow<E, A> =>
  flow(log("info", fm));

export const warn = <E, A>(fm: LogFunction<A>): TaskEitherFlow<E, A> =>
  flow(log("warn", fm));

export const error = <E, A>(fm: LogFunction<A>): TaskEitherFlow<E, A> =>
  flow(log("error", fm));

export const logLeft = <E, A>(
  level: LogLevels,
  fm: LogFunction<E>
): TaskEitherFlow<E, A> =>
  flow(
    TE.mapLeft(item => {
      w.log(level, processLogFunction(fm, item));
      return item;
    })
  );

export const debugLeft = <E, A>(fm: LogFunction<E>): TaskEitherFlow<E, A> =>
  flow(logLeft("debug", fm));

export const infoLeft = <E, A>(fm: LogFunction<E>): TaskEitherFlow<E, A> =>
  flow(logLeft("info", fm));

export const warnLeft = <E, A>(fm: LogFunction<E>): TaskEitherFlow<E, A> =>
  flow(logLeft("warn", fm));

export const errorLeft = <E, A>(fm: LogFunction<E>): TaskEitherFlow<E, A> =>
  flow(logLeft("error", fm));
