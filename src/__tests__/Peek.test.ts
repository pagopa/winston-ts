import { pipe } from "fp-ts/lib/function";
import * as PL from "../Peek";
import { clear, useDummyTransport, useEventDummyTransport } from "../../__mocks__/transports";
import { LoggerId } from "../types/logging";

const dummyMessage = "dummy-message";
const dummyItem = "dummy-item";
const dummyMeta = {dummy: "DUMMY"};

describe("index", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    clear();
  });

  it("log with string message with both default and event", async () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(dummyItem, PL.log("info", dummyMessage));
    expect(result).toEqual(dummyItem);
    expect(dummyLogger.transports[0].log).toBeCalledTimes(1);
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );

    const eventDummyLogger = useEventDummyTransport();
    const eventResult = pipe(dummyItem, PL.log("info", dummyMessage, LoggerId.event));
    expect(eventResult).toEqual(dummyItem);
    expect(eventDummyLogger.transports[0].log).toBeCalledTimes(1);
    expect(eventDummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });

  it("log with function message", async () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(
      dummyItem,
      PL.log("info", item => `${item} ${dummyMessage}`)
    );
    expect(result).toEqual(dummyItem);
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`
      }),
      expect.anything()
    );
  });

  it("log with function message and meta object", async () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(
      dummyItem,
      PL.log("info", item => [`${item} ${dummyMessage}`, dummyMeta])
    );
    expect(result).toEqual(dummyItem);
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`,
        ...dummyMeta
      }),
      expect.anything()
    );
  });
});
