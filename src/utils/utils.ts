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

/**
 * Performs a deep partial comparison between two objects
 * @param expected Expected object with partial properties
 * @param actual Actual object to compare
 * @returns Boolean indicating if the actual object matches the expected object (actual object might have more properties)
 */
export function isObjectAsExpectedIgnoringExtraProperties<T>(expected: Partial<T>, actual: T): boolean {
  return Object.entries(expected).every(([key, value]) => 
    value === undefined || actual[key as keyof T] === value
  );
}

/**
 * Type guard for partial object matching
 * @param obj Object to validate
 * @param predicate Validation function
 * @returns Boolean indicating if object matches the predicate
 */
export function isObjectValid<T>(
  obj: T | null | undefined, 
  predicate?: (obj: T) => boolean
): boolean {
  if (!obj) return false;
  if (!predicate) return true;

  return predicate(obj);  
}

/**
 * Performs a strict comparison between two objects
 * @param expected Expected object with exact properties
 * @param actual Actual object to compare
 * @returns Boolean indicating if the actual object exactly matches the expected object
 */
export function isObjectStrictlyEqual<T>(expected: T, actual: T): boolean {
  // Check if both objects are null or undefined
  if (expected === undefined && actual === undefined) return true;
  if (expected === null && actual === null) return true;
  
  // Check for null/undefined cases
  if (expected === undefined || actual === undefined) return false;
  if (expected === null || actual === null) return false;

  // Get keys from both objects
  const expectedKeys = Object.keys(expected);
  const actualKeys = Object.keys(actual);

  // Check if number of properties match
  if (expectedKeys.length !== actualKeys.length) return false;

  // Check each property for strict equality
  return expectedKeys.every(key => {
    // Ensure the key exists in the actual object
    if (!(key in actualKeys)) return false;

    const expectedValue = expected[key as keyof T];
    const actualValue = actual[key as keyof T];

    // For nested objects, use recursive comparison
    if (typeof expectedValue === 'object' && typeof actualValue === 'object') {
      return isObjectStrictlyEqual(expectedValue, actualValue);
    }

    // Strict equality comparison
    return expectedValue === actualValue;
  });
}