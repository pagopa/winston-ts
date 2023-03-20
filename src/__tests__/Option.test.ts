import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
import * as OL from "../Option";
import { useEventDummyTransport, clear, useDummyTransport } from "../../__mocks__/transports";
import { LoggerId } from "../types/logging";

const dummyMessage = "dummy-message";
const dummyItem = "dummy-item";
const dummyMeta = {dummy: "DUMMY"};

describe("index", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    clear();
  });

  it("do not log with none", () => {
    const dummyLogger = useDummyTransport();
    pipe(O.none, OL.log("info", dummyMessage));
    expect(dummyLogger.transports[0].log).toBeCalledTimes(0);
  });

  it("log with string message with both default and event", () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(dummyItem, O.some, OL.log("info", dummyMessage));
    expect(result).toEqual(expect.objectContaining({ value: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledTimes(1);
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );

    const eventDummyLogger = useEventDummyTransport();
    const eventResult = pipe(dummyItem, O.some, OL.log("info", dummyMessage, LoggerId.event));
    expect(eventResult).toEqual(expect.objectContaining({ value: dummyItem }));
    expect(eventDummyLogger.transports[0].log).toBeCalledTimes(1);
    expect(eventDummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });

  it("log with string message and meta object", () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(dummyItem, O.some, OL.log("info", [dummyMessage, dummyMeta]));
    expect(result).toEqual(expect.objectContaining({ value: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage, ...dummyMeta }),
      expect.anything()
    );
  });

  it("log with function message", () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(
      dummyItem,
      O.some,
      OL.log("info", item => `${item} ${dummyMessage}`)
    );
    expect(result).toEqual(expect.objectContaining({ value: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`
      }),
      expect.anything()
    );
  });

  it("log with function message and meta object", () => {
    const dummyLogger = useDummyTransport();    
    const result = pipe(
      dummyItem,
      O.some,
      OL.log("info", item => [`${item} ${dummyMessage}`, dummyMeta])
    );
    expect(result).toEqual(expect.objectContaining({ value: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`,
        ...dummyMeta
      }),
      expect.anything()
    );
  });

  it("log with none with both default and event", () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(O.none, OL.logNone("info", dummyMessage));
    expect(result).toEqual(O.none);
    expect(dummyLogger.transports[0].log).toBeCalledTimes(1);
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: dummyMessage
      }),
      expect.anything()
    );

    const eventDummyLogger = useEventDummyTransport();
    const eventResult = pipe(O.none, OL.logNone("info", dummyMessage, LoggerId.event));
    expect(eventResult).toEqual(O.none);
    expect(eventDummyLogger.transports[0].log).toBeCalledTimes(1);
    expect(eventDummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: dummyMessage
      }),
      expect.anything()
    );
  });

  it("do not log with some", () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(dummyItem, O.some, OL.logNone("info", dummyMessage));
    expect(result).toEqual(O.some(dummyItem));
    expect(dummyLogger.transports[0].log).toBeCalledTimes(0);
  });
});
