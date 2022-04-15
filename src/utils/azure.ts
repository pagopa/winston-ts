import { Context } from "@azure/functions";
import * as w from "winston";
import { AzureContextTransport } from "../transports/azure_context_transport";

const FINEST_LEVEL = "debug";

// eslint-disable-next-line functional/prefer-readonly-type
export const useWinston = (...transports: w.transport[]): void =>
  w.configure({
    level: FINEST_LEVEL,
    transports
  });

export const withContext = (context: Context): AzureContextTransport =>
  new AzureContextTransport(() => context.log, { level: FINEST_LEVEL });
