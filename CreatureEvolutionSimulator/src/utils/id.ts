let counter = 0;

export function generateId(prefix = "id"): string {
  const uuid =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${(counter += 1).toString(36)}`;
  return `${prefix}-${uuid}`;
}
