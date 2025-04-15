// src/services/base.service.ts
import supertest from 'supertest';
import { getEnvironmentConfig } from '../config/environments';

export abstract class BaseService {
  protected request: supertest.SuperTest<supertest.Test>;
  protected baseUrl: string;
  protected apiVersion: string;

  constructor(env: string = 'development') {
    const config = getEnvironmentConfig(env);
    this.baseUrl = config.baseUrl;
    this.apiVersion = config.apiVersion;
    
    this.request = supertest(this.baseUrl);
  }

  protected getFullUrl(endpoint: string): string {
    return `/${this.apiVersion}/${endpoint}`;
  }

  protected handleResponse<T>(response: supertest.Response): T {
    if (response.error) {
      throw new Error(`API Error: ${response.status} - ${response.text}`);
    }
    return response.body;
  }
}
