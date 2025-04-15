// src/config/environments.ts
export interface Environment {
  baseUrl: string;
  apiVersion: string;
  timeout: number;
}

export const environments: Record<string, Environment> = {
  development: {
    baseUrl: 'https://api.dev.example.com',
    apiVersion: 'v1',
    timeout: 5000
  },
  production: {
    baseUrl: 'https://api.example.com',
    apiVersion: 'v1',
    timeout: 3000
  },
  staging: {
    baseUrl: 'https://api.staging.example.com',
    apiVersion: 'v1',
    timeout: 4000
  }
};

export function getEnvironmentConfig(env: string = 'development'): Environment {
  return environments[env] || environments.development;
}
