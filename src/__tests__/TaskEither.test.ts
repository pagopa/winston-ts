import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import * as TEL from "../TaskEither";
import { useDummyTransport } from "../../__mocks__/transports";

const dummyMessage = "dummy-message";
const dummyItem = "dummy-item";
const dummyMeta = {dummy: "DUMMY"};

describe("index", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("do not log with left", async () => {
    const dummyTransport = useDummyTransport();
    await pipe(dummyItem, TE.left, TEL.log("info", dummyMessage))();
    expect(dummyTransport.log).toBeCalledTimes(0);
  });

  it("log with string message", async () => {
    const dummyTransport = useDummyTransport();
    const result = await pipe(
      dummyItem,
      TE.right,
      TEL.log("info", dummyMessage)
    )();
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });

  it("log with function message", async () => {
    const dummyTransport = useDummyTransport();
    const result = await pipe(
      dummyItem,
      TE.right,
      TEL.log("info", item => `${item} ${dummyMessage}`)
    )();
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`
      }),
      expect.anything()
    );
  });

  it("log with function message", async () => {
    const dummyTransport = useDummyTransport();
    const result = await pipe(
      dummyItem,
      TE.right,
      TEL.log("info", item => [`${item} ${dummyMessage}`, dummyMeta])
    )();
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`,
        ...dummyMeta
      }),
      expect.anything()
    );
  });

  it("do not logLeft with right", async () => {
    const dummyTransport = useDummyTransport();
    await pipe(dummyItem, TE.right, TEL.logLeft("info", dummyMessage))();
    expect(dummyTransport.log).toBeCalledTimes(0);
  });

  it("logLeft with string message", async () => {
    const dummyTransport = useDummyTransport();
    const result = await pipe(
      dummyItem,
      TE.left,
      TEL.logLeft("info", dummyMessage)
    )();
    expect(result).toEqual(expect.objectContaining({ left: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });

  it("logLeft with string message", async () => {
    const dummyTransport = useDummyTransport();
    const result = await pipe(
      dummyItem,
      TE.left,
      TEL.logLeft("info", [dummyMessage, dummyMeta])
    )();
    expect(result).toEqual(expect.objectContaining({ left: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage, ...dummyMeta }),
      expect.anything()
    );
  });
});
