import { flow } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import * as w from "winston";
import { LogFunction, LogLevels, processLogFunction } from "./types/logging";

type TaskEitherFlow = <E, A>(ma: TE.TaskEither<E, A>) => TE.TaskEither<E, A>;

export const log = (level: LogLevels, fm: LogFunction): TaskEitherFlow =>
  flow(
    TE.map(item => {
      w.log(level, processLogFunction(fm, item));
      return item;
    })
  );

export const debug = (fm: LogFunction): TaskEitherFlow =>
  flow(log("debug", fm));

export const info = (fm: LogFunction): TaskEitherFlow => flow(log("info", fm));

export const warn = (fm: LogFunction): TaskEitherFlow => flow(log("warn", fm));

export const error = (fm: LogFunction): TaskEitherFlow =>
  flow(log("error", fm));

export const logLeft = (level: LogLevels, fm: LogFunction): TaskEitherFlow =>
  flow(
    TE.mapLeft(item => {
      w.log(level, processLogFunction(fm, item));
      return item;
    })
  );

export const debugLeft = (fm: LogFunction): TaskEitherFlow =>
  flow(logLeft("debug", fm));

export const infoLeft = (fm: LogFunction): TaskEitherFlow =>
  flow(logLeft("info", fm));

export const warnLeft = (fm: LogFunction): TaskEitherFlow =>
  flow(logLeft("warn", fm));

export const errorLeft = (fm: LogFunction): TaskEitherFlow =>
  flow(logLeft("error", fm));
