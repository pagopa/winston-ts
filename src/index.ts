import * as O from "./Option";
import * as T from "./Task";
import * as E from "./Either";
import * as TE from "./TaskEither";

export const option = {
  debug: O.debug,
  debugNone: O.debugNone,
  error: O.error,
  errorNone: O.errorNone,
  info: O.info,
  infoNone: O.infoNone,
  log: O.log,
  logNone: O.logNone,
  warn: O.warn,
  warnNone: O.warnNone
};

export const task = {
  debug: T.debug,
  error: T.error,
  info: T.info,
  log: T.log,
  warn: T.warn
};

export const either = {
  debug: E.debug,
  debugLeft: E.debugLeft,
  error: E.error,
  errorLeft: E.errorLeft,
  info: E.info,
  infoLeft: E.infoLeft,
  log: E.log,
  logLeft: E.logLeft,
  warn: E.warn,
  warnLeft: E.warnLeft
};

export const taskEither = {
  debug: TE.debug,
  debugLeft: TE.debugLeft,
  error: TE.error,
  errorLeft: TE.errorLeft,
  info: TE.info,
  infoLeft: TE.infoLeft,
  log: TE.log,
  logLeft: TE.logLeft,
  warn: TE.warn,
  warnLeft: TE.warnLeft
};

export { useWinston, withConsole, FINEST_LEVEL } from "./utils/config";
