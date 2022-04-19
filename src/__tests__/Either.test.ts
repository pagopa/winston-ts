import * as Transport from "winston-transport";
import * as w from "winston";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import * as EL from "../Either";
import { useDummyTransport } from "../../__mocks__/transports";

const dummyMessage = "dummy-message";
const dummyItem = "dummy-item";

describe("index", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("do not log with left", () => {
    const dummyTransport = useDummyTransport();
    pipe(dummyItem, E.left, EL.log("info", dummyMessage));
    expect(dummyTransport.log).toBeCalledTimes(0);
  });

  it("log with string message", () => {
    const dummyTransport = useDummyTransport();
    const result = pipe(dummyItem, E.right, EL.log("info", dummyMessage));
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });

  it("log with function message", () => {
    const dummyTransport = useDummyTransport();
    const result = pipe(
      dummyItem,
      E.right,
      EL.log("info", item => `${item} ${dummyMessage}`)
    );
    expect(result).toEqual(expect.objectContaining({ right: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`
      }),
      expect.anything()
    );
  });

  it("do not logLeft with right", () => {
    const dummyTransport = useDummyTransport();
    pipe(dummyItem, E.right, EL.logLeft("info", dummyMessage));
    expect(dummyTransport.log).toBeCalledTimes(0);
  });

  it("logLeft with string message", () => {
    const dummyTransport = useDummyTransport();
    const result = pipe(dummyItem, E.left, EL.logLeft("info", dummyMessage));
    expect(result).toEqual(expect.objectContaining({ left: dummyItem }));
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });
});
