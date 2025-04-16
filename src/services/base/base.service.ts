import supertest from 'supertest';
import { getEnvironmentConfig, ServiceConfiguration } from '../../config/environments';
import { ApiResponse } from './apiResponse';


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
  constructor(serviceName: string) {
    this._env = process.env.ENV || 'development';
    this._serviceName = serviceName;
    this._serviceConfig = getEnvironmentConfig(this._env, serviceName);
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
    const result = pathString ? `${this._serviceConfig.baseUrl}/${pathString}` : this._serviceConfig.baseUrl;
    return result;
  }

  /**
   * Sends GET request and returns raw response
   * @param endpoint - API endpoint
   * @param pathParams - Path parameters for the endpoint
   * @param queryParams - Optional query parameters
   * @returns Raw API response
   */
  protected async sendGet(
    endpoint: string,
    pathParams: string[] = [],
    queryParams?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<any>> {
    try {
      let pathParamsString = pathParams.join('/');
      if (pathParamsString.length > 0) {
        pathParamsString = `/${pathParamsString}`;
      }
      const request = supertest(this._serviceConfig.baseUrl)
        .get(`/${endpoint}${pathParamsString}`)
        .timeout({
          // 'deadline' is the overall time limit for the entire request
          deadline: this._serviceConfig.connectionTimeout || 3000,
          // 'response' is the time to wait for the server to send response headers
          response: this._serviceConfig.responseTimeout || 5000
        });

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
   * @param endpoint 
   * @param pathParams - Path parameters for the endpoint
   * @param body - Request body
   * @param queryParams - Optional query parameters
   * @returns Raw API response
   */
  protected async sendPost(
    endpoint: string,
    pathParams: string[] = [],
    body: any,
    queryParams?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<any>> {
    try {
      let pathParamsString = pathParams.join('/');
      if (pathParamsString.length > 0) {
        pathParamsString = `/${pathParamsString}`;
      }
      const request = supertest(this._serviceConfig.baseUrl)
        .post(`/${endpoint}${pathParamsString}`)
        .send(body)
        .timeout({
          // 'deadline' is the overall time limit for the entire request
          deadline: this._serviceConfig.connectionTimeout || 3000,
          // 'response' is the time to wait for the server to send response headers
          response: this._serviceConfig.responseTimeout || 5000
        });

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
   * @param endpoint - API endpoint
   * @param pathParams - Path parameters for the endpoint
   * @param body - Request body
   * @param queryParams - Optional query parameters
   * @returns Raw API response
   */
  protected async sendPut(
    endpoint: string,
    pathParams: string[] = [],
    body: any,
    queryParams?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<any>> {
    try {
      let pathParamsString = pathParams.join('/');
      if (pathParamsString.length > 0) {
        pathParamsString = `/${pathParamsString}`;
      }
      const request = supertest(this._serviceConfig.baseUrl)
        .put(`/${endpoint}${pathParamsString}`)
        .send(body)
        .timeout({
          // 'deadline' is the overall time limit for the entire request
          deadline: this._serviceConfig.connectionTimeout || 3000,
          // 'response' is the time to wait for the server to send response headers
          response: this._serviceConfig.responseTimeout || 5000
        });

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
   * @param endpoint - API endpoint
   * @param pathParams - Path parameters for the endpoint
   * @param queryParams - Optional query parameters
   * @returns Raw API response
   */
  protected async sendDelete(
    endpoint: string,
    pathParams: string[] = [],
    queryParams?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<any>> {
    try {
      let pathParamsString = pathParams.join('/');
      if (pathParamsString.length > 0) {
        pathParamsString = `/${pathParamsString}`;
      }
      const request = supertest(this._serviceConfig.baseUrl)
        .delete(`/${endpoint}${pathParamsString}`)
        .timeout({
          // 'deadline' is the overall time limit for the entire request
          deadline: this._serviceConfig.connectionTimeout || 3000,
          // 'response' is the time to wait for the server to send response headers
          response: this._serviceConfig.responseTimeout || 5000
        });

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
