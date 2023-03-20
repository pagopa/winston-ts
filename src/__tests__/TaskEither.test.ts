import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import * as TEL from "../TaskEither";
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

  it("do not log with left", async () => {
    const dummyLogger = useDummyTransport();
    await pipe(dummyItem, TE.left, TEL.log("info", dummyMessage))();
    expect(dummyLogger.transports[0].log).toBeCalledTimes(0);
  });

  it("log with string message with both default and event", async () => {
    const dummyLogger = useDummyTransport();
    const result = await pipe(
      dummyItem,
      TE.right,
      TEL.log("info", dummyMessage)
    )();
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledTimes(1);
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );

    const eventDummyLogger = useEventDummyTransport();
    const eventResult = await pipe(
      dummyItem,
      TE.right,
      TEL.log("info", dummyMessage, LoggerId.event)
    )();
    expect(eventResult).toEqual(expect.objectContaining({ right: dummyItem }));
    expect(eventDummyLogger.transports[0].log).toBeCalledTimes(1);
    expect(eventDummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );

  });

  it("log with function message", async () => {
    const dummyLogger = useDummyTransport();
    const result = await pipe(
      dummyItem,
      TE.right,
      TEL.log("info", item => `${item} ${dummyMessage}`)
    )();
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`
      }),
      expect.anything()
    );
  });

  it("log with function message", async () => {
    const dummyLogger = useDummyTransport();
    const result = await pipe(
      dummyItem,
      TE.right,
      TEL.log("info", item => [`${item} ${dummyMessage}`, dummyMeta])
    )();
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

  it("do not logLeft with right", async () => {
    const dummyLogger = useDummyTransport();
    await pipe(dummyItem, TE.right, TEL.logLeft("info", dummyMessage))();
    expect(dummyLogger.transports[0].log).toBeCalledTimes(0);
  });

  it("logLeft with string message", async () => {
    const dummyLogger = useDummyTransport();
    const result = await pipe(
      dummyItem,
      TE.left,
      TEL.logLeft("info", dummyMessage)
    )();
    expect(result).toEqual(expect.objectContaining({ left: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });

  it("logLeft with string message", async () => {
    const dummyLogger = useDummyTransport();
    const result = await pipe(
      dummyItem,
      TE.left,
      TEL.logLeft("info", [dummyMessage, dummyMeta])
    )();
    expect(result).toEqual(expect.objectContaining({ left: dummyItem }));
    expect(dummyLogger.transports[0].log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage, ...dummyMeta }),
      expect.anything()
    );
  });
});
