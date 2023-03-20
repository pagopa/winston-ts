import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import * as EL from "../Either";
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

  it("do not log with left", () => {
    const dummyLogger = useDummyTransport();
    pipe(dummyItem, E.left, EL.log("info", dummyMessage));
    expect(dummyLogger.transports[0].log).toBeCalledTimes(0);
  });

  it("do not log with left with both default and event transport", () => {
    const dummyLogger = useDummyTransport();
    const eventDummyLogger = useEventDummyTransport();

    pipe(dummyItem, E.left, EL.log("info", dummyMessage));
    expect(dummyLogger.transports[0].log).toBeCalledTimes(0);

    pipe(dummyItem, E.left, EL.log("info", dummyMessage, LoggerId.event));
    expect(eventDummyLogger.transports[0].log).toBeCalledTimes(0);
  });

  it("log with string message with both default and event transport", async () => {
    const dummyLogger = useDummyTransport();
    const eventDummyLogger = useEventDummyTransport();

    const result = pipe(dummyItem, E.right, EL.log("info", dummyMessage));
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
    
    expect(dummyLogger.transports[0].log).toBeCalledTimes(1);
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );

    const resultEvent = pipe(dummyItem, E.right, EL.log("info", dummyMessage, LoggerId.event));
    expect(resultEvent).toEqual(expect.objectContaining({ right: dummyItem }));
    
    expect(eventDummyLogger.transports[0].log).toBeCalledTimes(1);
    expect(eventDummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });

  it("log (but not throw) errors if loggers are not configured properly", () => {
    console.error = jest.fn();
    const result = pipe(dummyItem, E.right, EL.log("info", dummyMessage));
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));

    const resultEvent = pipe(dummyItem, E.right, EL.log("info", dummyMessage, LoggerId.event));
    expect(resultEvent).toEqual(expect.objectContaining({ right: dummyItem }));
  });


  it("log with string message", async () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(dummyItem, E.right, EL.log("info", dummyMessage));
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });

  it("log with string message and meta object", () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(dummyItem, E.right, EL.log("info", [dummyMessage, dummyMeta]));
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage, ...dummyMeta }),
      expect.anything()
    );
  });

  it("log with function message aaaa", () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(
      dummyItem,
      E.right,
      EL.log("info", item => `${item} ${dummyMessage}`)
    );
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
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
      E.right,
      EL.log("info", item => [`${item} ${dummyMessage}`, dummyMeta])
    );
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`,
        ...dummyMeta
      }),
      expect.anything()
    );
  });

  it("do not logLeft with right", () => {
    const dummyLogger = useDummyTransport();
    pipe(dummyItem, E.right, EL.logLeft("info", dummyMessage));
    expect(dummyLogger.transports[0].log).toBeCalledTimes(0);
  });

  it("logLeft with string message", () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(dummyItem, E.left, EL.logLeft("info", dummyMessage));
    expect(result).toEqual(expect.objectContaining({ left: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });

  it("logLeft with string message and meta object", () => {
    const dummyLogger = useDummyTransport();
    const result = pipe(dummyItem, E.left, EL.logLeft("info", [dummyMessage, dummyMeta]));
    expect(result).toEqual(expect.objectContaining({ left: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage, ...dummyMeta }),
      expect.anything()
    );
  });
});
