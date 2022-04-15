import * as ER from "fp-ts/Either";
import { flow } from "fp-ts/lib/function";
import * as w from "winston";
import { LogFunction, LogLevels, processLogFunction } from "./types/logging";

type EitherFlow = <E, A>(ma: ER.Either<E, A>) => ER.Either<E, A>;

export const log = (level: LogLevels, fm: LogFunction): EitherFlow =>
  flow(
    ER.map(item => {
      w.log(level, processLogFunction(fm, item));
      return item;
    })
  );

export const debug = (fm: LogFunction): EitherFlow => flow(log("debug", fm));

export const info = (fm: LogFunction): EitherFlow => flow(log("info", fm));

export const warn = (fm: LogFunction): EitherFlow => flow(log("warn", fm));

export const error = (fm: LogFunction): EitherFlow => flow(log("error", fm));

export const logLeft = (level: LogLevels, fm: LogFunction): EitherFlow =>
  flow(
    ER.mapLeft(item => {
      w.log(level, processLogFunction(fm, item));
      return item;
    })
  );

export const debugLeft = (fm: LogFunction): EitherFlow =>
  flow(logLeft("debug", fm));

export const infoLeft = (fm: LogFunction): EitherFlow =>
  flow(logLeft("info", fm));

export const warnLeft = (fm: LogFunction): EitherFlow =>
  flow(logLeft("warn", fm));

export const errorLeft = (fm: LogFunction): EitherFlow =>
  flow(logLeft("error", fm));
