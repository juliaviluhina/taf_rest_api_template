/**
 * Helper function to filter out undefined values from an object
 * @param params Object with potentially undefined values
 * @returns Object with only defined values
 */
export function filterDefinedParams<T extends Record<string, any>>(params?: T): Partial<T> {
  if (!params) return {};
  
  return Object.fromEntries(
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
  ) as Partial<T>;
}
