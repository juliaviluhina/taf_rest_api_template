# REST API Test Automation Framework

## Overview
This is a comprehensive REST API Test Automation Framework designed to provide a robust, scalable, and maintainable solution for API testing.

## Project Structure
//TODO - generate based on explanation
    



## Key Components Explained
//TODO - make it more well-structured and comprehelsive
* serviceContracts folder contains JSONs which describes contracts for service (serviceName.json). JSON secribes service in swagger format
* src\config contains configurational methods and classes (e g environments.ts describe environments and services on these environments)
* src\models contains DTO's for all request and response JSONs for service. File <servicename>.model.ts contains all classes for certain service
* if some DTO's are common to few services, use common.models.ts 
* src\services contains implmentation of interactions for certain service
    * basic functionality is described in parent class BaseService, base.service.ts
        - it manages configuration retrieval
        - response analysis
        - sending requests (GET, DELETE, POST, PUT) and it's parameters
    * specific servive extend BaseService class and implements sertain service, file name is <serviceName>.service.ts
        - it reuses functionality of parent class and have public methods for sending requests to eact endpoint and managing parameters which are specific to this endpoint
        - methods operates DTO classes to descrive request and response bodies
* src\features\serviceName contains  <featureName>.feature files with BDD scenarios for certain service
* src\stepDefinitions\ contains 
    * common.stepDefinition.ts with step definitions which are common for BDD scenatios of many feature files
    * <featureName>.stepDefinition.ts with step definition which are used specifically for  <featureName>.feature 

### 6. Testing Approaches
- BDD-style feature tests to test services endpoits (send request and validate response, negative and positive scenarios)

## Features
- TypeScript for type safety
- Cucumber for BDD testing
- Scalable and maintainable architecture

## Setup and Installation
1. Clone the repository
2. Run \`npm install\`
3. Configure your environment settings
4. Run tests with \`npm test\`

## Running Tests
- Development environment: \`npm run test:dev\`
- Staging environment: \`npm run test:staging\`

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License
