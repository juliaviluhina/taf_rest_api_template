export interface Environment {
  services: ServiceConfiguration[];
}

export interface ServiceConfiguration {
  serviceName: string;
  baseUrl: string;
  apiVersion: string;
  timeout: number;
}

export const environments: Record<string, Environment> = {
  development: {
    services: [
      {
        serviceName: "wizardWorld",
        baseUrl: 'https://wizard-world-api.herokuapp.com',
        apiVersion: 'v1',
        timeout: 5000
      }
    ]

  },
  uat: {
    services: [
      {
        serviceName: "wizardWorld",
        baseUrl: 'https://wizard-world-api.herokuapp.com',
        apiVersion: 'v1',
        timeout: 3000
      }
    ]
  },
  staging: {
    services: [
      {
        serviceName: "wizardWorld",
        baseUrl: 'https://wizard-world-api.herokuapp.com',
        apiVersion: 'v1',
        timeout: 4000
      }
    ]
  }
};

export function getEnvironmentConfig(env: string = 'development', serviceName: string): ServiceConfiguration {
  const environment =  environments[env] || environments.development;
  const service = environment.services.find(service => service.serviceName === serviceName);
  if (!service) {
    throw new Error(`Service ${serviceName} not found in environment ${env}`);
  }
  return service
}
