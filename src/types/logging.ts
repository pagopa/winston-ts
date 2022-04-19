export type LogLevels = "debug" | "info" | "warn" | "error";

export type LogFunction<A> = ((a: A) => string) | string;

export const processLogFunction = <A>(fm: LogFunction<A>, item: A): string =>
  fm instanceof Function ? fm(item) : fm;
