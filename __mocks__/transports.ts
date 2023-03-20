import * as w from "winston";
import * as Transport from "winston-transport";
import { LoggerId } from "../src/types/logging";

class DummyTransport extends Transport {
  log = jest.fn();
}

export const useDummyTransport = (): w.Logger => {
  return w.loggers.add(LoggerId.default, {
    level: "debug",
    transports: [new DummyTransport()]
  });
};

export const useEventDummyTransport = (): w.Logger => {
  return w.loggers.add(LoggerId.event, {
    level: "debug",
    transports: [ new DummyTransport()]
  });
};

export const clear = (): void => {
  w.loggers.close(LoggerId.default);
  w.loggers.close(LoggerId.event);
}