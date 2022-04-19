import * as O from "./Option";
import * as T from "./Task";
import * as E from "./Either";
import * as TE from "./TaskEither";

export const option = {
  debug: O.debug,
  error: O.error,
  info: O.info,
  log: O.log,
  warn: O.warn
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
  error: E.error,
  info: E.info,
  log: E.log,
  warn: E.warn
};

export const taskEither = {
  debug: TE.debug,
  error: TE.error,
  info: TE.info,
  log: TE.log,
  warn: TE.warn
};

export { useWinston, withContext } from "./utils/azure";
