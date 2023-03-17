import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
import * as OL from "../Option";
import { useDummyTransport } from "../../__mocks__/transports";

const dummyMessage = "dummy-message";
const dummyItem = "dummy-item";
const dummyMeta = {dummy: "DUMMY"};

describe("index", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("do not log with none", () => {
    const dummyTransport = useDummyTransport();
    pipe(O.none, OL.log("info", dummyMessage));
    expect(dummyTransport.log).toBeCalledTimes(0);
  });

  it("log with string message", () => {
    const dummyTransport = useDummyTransport();
    const result = pipe(dummyItem, O.some, OL.log("info", dummyMessage));
    expect(result).toEqual(expect.objectContaining({ value: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });

  it("log with string message and meta object", () => {
    const dummyTransport = useDummyTransport();
    const result = pipe(dummyItem, O.some, OL.log("info", [dummyMessage, dummyMeta]));
    expect(result).toEqual(expect.objectContaining({ value: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage, ...dummyMeta }),
      expect.anything()
    );
  });

  it("log with function message", () => {
    const dummyTransport = useDummyTransport();
    const result = pipe(
      dummyItem,
      O.some,
      OL.log("info", item => `${item} ${dummyMessage}`)
    );
    expect(result).toEqual(expect.objectContaining({ value: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`
      }),
      expect.anything()
    );
  });

  it("log with function message and meta object", () => {
    const dummyTransport = useDummyTransport();    
    const result = pipe(
      dummyItem,
      O.some,
      OL.log("info", item => [`${item} ${dummyMessage}`, dummyMeta])
    );
    expect(result).toEqual(expect.objectContaining({ value: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`,
        ...dummyMeta
      }),
      expect.anything()
    );
  });

  it("log with none", () => {
    const dummyTransport = useDummyTransport();
    const result = pipe(O.none, OL.logNone("info", dummyMessage));
    expect(result).toEqual(O.none);
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: dummyMessage
      }),
      expect.anything()
    );
  });

  it("do not log with some", () => {
    const dummyTransport = useDummyTransport();
    const result = pipe(dummyItem, O.some, OL.logNone("info", dummyMessage));
    expect(result).toEqual(O.some(dummyItem));
    expect(dummyTransport.log).toBeCalledTimes(0);
  });
});
