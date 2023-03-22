import * as w from "winston";
import { Format } from "logform";
import { LoggerId, LogLevels } from "../types/logging";

export const FINEST_LEVEL: LogLevels = "debug";

// eslint-disable-next-line functional/prefer-readonly-type
export const useWinston = (...transports: w.transport[]): w.Logger =>
  w.loggers.add(LoggerId.default, {
    exitOnError: false,
    level: FINEST_LEVEL,
    transports
  });

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type UseWinstonInput = {
  readonly loggerId: LoggerId;
  readonly format?: Format;
  // eslint-disable-next-line functional/prefer-readonly-type
  readonly transports: w.transport[];
};

export const useWinstonFor = ({
  loggerId,
  format,
  transports
}: UseWinstonInput): w.Logger =>
  w.loggers.add(loggerId, {
    exitOnError: false,
    format,
    level: FINEST_LEVEL,
    transports
  });

export const withConsole = (): w.transport => new w.transports.Console();
