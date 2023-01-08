import * as Transport from "winston-transport";
import * as w from "winston";
import { pipe } from "fp-ts/lib/function";
import * as T from "fp-ts/Task";
import * as TL from "../Task";
import { useDummyTransport } from "../../__mocks__/transports";

const dummyMessage = "dummy-message";
const dummyItem = "dummy-item";

describe("index", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("log with string message", async () => {
    const dummyTransport = useDummyTransport();
    const result = await pipe(dummyItem, T.of, TL.log("info", dummyMessage))();
    expect(result).toEqual(dummyItem);
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({ level: "info", message: dummyMessage }),
      expect.anything()
    );
  });

  it("log with function message", async () => {
    const dummyTransport = useDummyTransport();
    const result = await pipe(
      dummyItem,
      T.of,
      TL.log("info", item => `${item} ${dummyMessage}`)
    )();
    expect(result).toEqual(dummyItem);
    expect(dummyTransport.log).toBeCalledWith(
      expect.objectContaining({
        level: "info",
        message: `${dummyItem} ${dummyMessage}`
      }),
      expect.anything()
    );
  });
});