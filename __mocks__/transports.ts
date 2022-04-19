import { configure } from "winston";
import * as Transport from "winston-transport";

class DummyTransport extends Transport {
  log = jest.fn();
}

export const useDummyTransport = (): Transport => {
  const dummyTransport = new DummyTransport();
  configure({
    level: "debug",
    transports: [dummyTransport]
  });
  return dummyTransport;
};
