export function hasOwn<Obj extends object>(
  object: Obj,
  key: PropertyKey
): key is keyof Obj {
  return Object.hasOwn(object, key);
}
