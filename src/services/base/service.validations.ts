import { isObjectStrictlyEqual, isObjectAsExpectedIgnoringExtraProperties, isObjectValid } from '../../utils/utils'
import { ApiResponse } from './apiResponse';

export class ServiceValidations {

  /**
   * Validates successful response
   * @param response - API response to validate
   * @param expectedStatus - Expected HTTP status code (default: 200)
   * @param bodyValidator - Optional validator function for response body
   * @throws Error if validation fails
   */
  public validateSuccessValidResponse<T>(
    response: ApiResponse<T>,
    expectedStatus: number = 200,
    bodyValidator?: (body: T) => boolean
  ): void {
    if (response.status !== expectedStatus) {
      throw new Error(`Unexpected status code. Expected ${expectedStatus}, got ${response.status}`);
    }
    if (!isObjectValid(response.body, bodyValidator)) {
      throw new Error('Response body validation failed');
    }
  }

  /**
   * Validates successful response: actual body should have all properties of expected body, and might have more
   * @param response - API response to validate
   * @param expectedStatus - Expected HTTP status code (default: 200)
   * @param expectedBody - Expected body
   * @throws Error if validation fails
   */
  public validateSuccessResponseNonStrictly<T>(
    response: ApiResponse<T>,
    expectedStatus: number = 200,
    expectedBody: T
  ): void {
    if (response.status !== expectedStatus) {
      throw new Error(`Unexpected status code. Expected ${expectedStatus}, got ${response.status}`);
    }
    if (!isObjectAsExpectedIgnoringExtraProperties(expectedBody, response.body)) {
      throw new Error('Response body validation failed');
    }
  }

  /**
   * Validates successful response: actual body should have all properties of expected body, and should NOT have more
   * @param response - API response to validate
   * @param expectedStatus - Expected HTTP status code (default: 200)
   * @param expectedBody - Expected body
   * @throws Error if validation fails
   */
  public validateSuccessResponseStrictly<T>(
    response: ApiResponse<T>,
    expectedStatus: number = 200,
    expectedBody: T
  ): void {
    if (response.status !== expectedStatus) {
      throw new Error(`Unexpected status code. Expected ${expectedStatus}, got ${response.status}`);
    }
    if (!isObjectStrictlyEqual(expectedBody, response.body)) {
      throw new Error('Response body validation failed');
    }
  }


  /**
   * Validates error response
   * @param response - API response to validate
   * @param expectedStatus - Expected HTTP status code
   * @param expectedErrorText - Optional expected error text
   * @param errorValidator - Optional validator function for error response
   * @throws Error if validation fails
   */
  protected validateErrorResponse<T>(
    response: ApiResponse<T>,
    expectedStatus: number,
    expectedErrorText?: string,
    errorValidator?: (body: T) => boolean
  ): void {
    // Check status code
    if (response.status !== expectedStatus) {
      throw new Error(`Unexpected status code. Expected ${expectedStatus}, got ${response.status}`);
    }

    // Check error text if provided
    if (expectedErrorText) {
      const responseText = typeof response.body === 'string'
        ? response.body
        : JSON.stringify(response.body);

      if (!responseText.includes(expectedErrorText)) {
        throw new Error(`Expected error text not found. Expected: ${expectedErrorText}`);
      }
    }

    // Validate error body if validator provided
    if (errorValidator && !errorValidator(response.body)) {
      throw new Error('Error response body validation failed');
    }
  }

}
