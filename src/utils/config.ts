import * as w from "winston";
import { LoggerId, LogLevels } from "../types/logging";

export const FINEST_LEVEL: LogLevels = "debug";

// eslint-disable-next-line functional/prefer-readonly-type
export const useWinston = (...transports: w.transport[]): w.Logger =>
  w.loggers.add(LoggerId.default, {
    exitOnError: false,
    level: FINEST_LEVEL,
    transports
  });

export const useWinstonFor = (
  loggerId: LoggerId,
  // eslint-disable-next-line functional/prefer-readonly-type
  ...transports: w.transport[]
): w.Logger =>
  w.loggers.add(loggerId, {
    exitOnError: false,
    level: FINEST_LEVEL,
    transports
  });

export const withConsole = (): w.transport => new w.transports.Console();
