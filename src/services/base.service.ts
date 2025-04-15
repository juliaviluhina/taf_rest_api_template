import supertest from 'supertest';
import { getEnvironmentConfig, ServiceConfiguration } from '../config/environments';

export abstract class BaseService {
  protected request: supertest.SuperTest<supertest.Test>;
  private serviceConfig: ServiceConfiguration;
  private env: string;
  private serviceName: string;

  constructor(env: string = 'development', serviceName: string) {
    this.serviceName = serviceName;
    this.env = env;

    this.serviceConfig = getEnvironmentConfig(env, serviceName);
  }

  protected getFullUrl(endpoint: string): string {
    return `${this.serviceConfig}/${endpoint}`;
  }

  protected handleResponse<T>(response: supertest.Response): T {
    if (response.error) {
      throw new Error(`API Error: ${response.status} - ${response.text}`);
    }
    return response.body;
  }

  //TODO handle methods for different types of requests - GET, POST, PUT, DELETE with parameters support, with request body support for POST and PUT
}
