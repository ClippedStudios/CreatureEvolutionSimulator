export function cloneDeep<T>(value: T): T {
  const globalClone = (globalThis as { structuredClone?: <U>(input: U) => U }).structuredClone;
  if (typeof globalClone === "function") {
    return globalClone(value);
  }

  return JSON.parse(JSON.stringify(value));
}
