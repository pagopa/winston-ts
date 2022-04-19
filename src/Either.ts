import * as ER from "fp-ts/Either";
import { flow } from "fp-ts/lib/function";
import * as w from "winston";
import { LogFunction, LogLevels, processLogFunction } from "./types/logging";

type EitherFlow<E, A> = (ma: ER.Either<E, A>) => ER.Either<E, A>;

export const log = <E, A>(
  level: LogLevels,
  fm: LogFunction<A>
): EitherFlow<E, A> =>
  flow(
    ER.map(item => {
      w.log(level, processLogFunction(fm, item));
      return item;
    })
  );

export const debug = <E, A>(fm: LogFunction<A>): EitherFlow<E, A> =>
  flow(log("debug", fm));

export const info = <E, A>(fm: LogFunction<A>): EitherFlow<E, A> =>
  flow(log("info", fm));

export const warn = <E, A>(fm: LogFunction<A>): EitherFlow<E, A> =>
  flow(log("warn", fm));

export const error = <E, A>(fm: LogFunction<A>): EitherFlow<E, A> =>
  flow(log("error", fm));

export const logLeft = <E, A>(
  level: LogLevels,
  fm: LogFunction<E>
): EitherFlow<E, A> =>
  flow(
    ER.mapLeft(item => {
      w.log(level, processLogFunction(fm, item));
      return item;
    })
  );

export const debugLeft = <E, A>(fm: LogFunction<E>): EitherFlow<E, A> =>
  flow(logLeft("debug", fm));

export const infoLeft = <E, A>(fm: LogFunction<E>): EitherFlow<E, A> =>
  flow(logLeft("info", fm));

export const warnLeft = <E, A>(fm: LogFunction<E>): EitherFlow<E, A> =>
  flow(logLeft("warn", fm));

export const errorLeft = <E, A>(fm: LogFunction<E>): EitherFlow<E, A> =>
  flow(logLeft("error", fm));
