import * as w from "winston";

export const FINEST_LEVEL = "debug";

// eslint-disable-next-line functional/prefer-readonly-type
export const useWinston = (...transports: w.transport[]): void =>
  w.configure({
    level: FINEST_LEVEL,
    transports
  });
