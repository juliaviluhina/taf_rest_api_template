import supertest from 'supertest';
import { getEnvironmentConfig, ServiceConfiguration } from '../config/environments';
import { isObjectStrictlyEqual, isObjectAsExpectedIgnoringExtraProperties, isObjectValid } from '../utils/utils'

/**
 * Represents the result of an API request
 */
export interface ApiResponse<T> {
  status: number;
  body: T;
  headers: Record<string, string>;
}

/**
 * BaseService provides core functionality for API interactions
 * - Manages service configuration
 * - Handles API requests with path and query parameters
 * - Separates request sending and response validation
 */
export abstract class BaseService {
  // Readonly properties to ensure immutability
  private readonly _env: string;
  private readonly _serviceName: string;
  private readonly _serviceConfig: ServiceConfiguration;

  /**
   * Constructor initializes immutable service configuration
   * @param env - Environment name (default: 'development')
   * @param serviceName - Name of the service
   */
  constructor(serviceName: string, env: string = 'development') {
    this._env = env;
    this._serviceName = serviceName;
    this._serviceConfig = getEnvironmentConfig(env, serviceName);
  }

  /**
   * Getter for environment
   */
  get env(): string {
    return this._env;
  }

  /**
   * Getter for service name
   */
  get serviceName(): string {
    return this._serviceName;
  }

  /**
   * Getter for service configuration
   */
  get serviceConfig(): ServiceConfiguration {
    return this._serviceConfig;
  }

  /**
   * Constructs full URL for API endpoint
   * @param pathParams - Path parameters to append to base URL
   * @returns Fully constructed URL
   */
  protected getFullUrl(...pathParams: string[]): string {
    // Combine base URL with path parameters
    const pathString = pathParams.map(p => p.toString().replace(/^\/|\/$/g, '')).join('/');
    return pathString ? `${this._serviceConfig.baseUrl}/${pathString}` : this._serviceConfig.baseUrl;
  }

  /**
   * Sends GET request and returns raw response
   * @param pathParams - Path parameters for the endpoint
   * @param queryParams - Optional query parameters
   * @returns Raw API response
   */
  protected async sendGet(
    pathParams: string[] = [],
    queryParams?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<any>> {
    try {
      const request = supertest(this._serviceConfig.baseUrl)
        .get(pathParams.join('/'));

      if (queryParams) {
        request.query(queryParams);
      }

      const response = await request;
      return this.processRawResponse(response);
    } catch (error) {
      this.logError('GET', this.getFullUrl(...pathParams), error);
      throw error;
    }
  }

  /**
   * Sends POST request and returns raw response
   * @param pathParams - Path parameters for the endpoint
   * @param body - Request body
   * @param queryParams - Optional query parameters
   * @returns Raw API response
   */
  protected async sendPost(
    pathParams: string[] = [],
    body: any,
    queryParams?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<any>> {
    try {
      const request = supertest(this._serviceConfig.baseUrl)
        .post(pathParams.join('/'))
        .send(body);

      if (queryParams) {
        request.query(queryParams);
      }

      const response = await request;
      return this.processRawResponse(response);
    } catch (error) {
      this.logError('POST', this.getFullUrl(...pathParams), error);
      throw error;
    }
  }

  /**
   * Sends PUT request and returns raw response
   * @param pathParams - Path parameters for the endpoint
   * @param body - Request body
   * @param queryParams - Optional query parameters
   * @returns Raw API response
   */
  protected async sendPut(
    pathParams: string[] = [],
    body: any,
    queryParams?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<any>> {
    try {
      const request = supertest(this._serviceConfig.baseUrl)
        .put(pathParams.join('/'))
        .send(body);

      if (queryParams) {
        request.query(queryParams);
      }

      const response = await request;
      return this.processRawResponse(response);
    } catch (error) {
      this.logError('PUT', this.getFullUrl(...pathParams), error);
      throw error;
    }
  }

  /**
   * Sends DELETE request and returns raw response
   * @param pathParams - Path parameters for the endpoint
   * @param queryParams - Optional query parameters
   * @returns Raw API response
   */
  protected async sendDelete(
    pathParams: string[] = [],
    queryParams?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<any>> {
    try {
      const request = supertest(this._serviceConfig.baseUrl)
        .delete(pathParams.join('/'));

      if (queryParams) {
        request.query(queryParams);
      }

      const response = await request;
      return this.processRawResponse(response);
    } catch (error) {
      this.logError('DELETE', this.getFullUrl(...pathParams), error);
      throw error;
    }
  }

  /**
   * Processes raw supertest response into ApiResponse
   * @param response - Supertest response
   * @returns Processed API response
   */
  private processRawResponse(response: supertest.Response): ApiResponse<any> {
    this.logResponse(response);

    return {
      status: response.status,
      body: response.body,
      headers: response.headers
    };
  }

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
  protected validateErrorResponse(
    response: ApiResponse<any>,
    expectedStatus: number,
    expectedErrorText?: string,
    errorValidator?: (body: any) => boolean
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

  /**
   * Logs API request errors
   * @param method - HTTP method
   * @param url - Request URL
   * @param error - Error object
   */
  private logError(method: string, url: string, error: any): void {
    console.error(`[API Error] ${method} ${url}:`,
      error instanceof Error ? error.message : JSON.stringify(error)
    );
  }

  /**
   * Logs API response for debugging
   * @param response - Supertest response
   */
  private logResponse(response: supertest.Response): void {
    console.log(`[API Response] Status: ${response.status}`,
      `Body:`, JSON.stringify(response.body).slice(0, 500) + '...'
    );
  }
}
