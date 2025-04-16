# REST API Test Automation Framework

## Overview
This is a comprehensive REST API Test Automation Framework designed to provide a robust, scalable, and maintainable solution for API testing.

## Project Structure
```
taf_rest_api_template/
│
├── serviceContracts/             # JSON service contract definitions
│   └── serviceName.json          # Swagger-like service contract
│
├── src/
│   ├── config/                   # Configuration management
│   │   └── environments.ts       # Environment and service configurations
│   │
│   ├── models/                   # Data Transfer Objects (DTOs)
│   │   ├── common.models.ts      # Common DTOs across services
│   │   └── serviceName.model.ts  # Service-specific models
│   │
│   ├── services/                 # Service interaction implementations
│   │   ├── serviceName/
│   │   │    ├── base.service.ts   # Base service with core functionality - functionality for sending request, BaseService class, parent for specific services
│   │   │    ├── service.validations.ts # Methods for different response validations,ight be used for responses of fifferent structure (universal)
│   │   │    └── apiResponse.ts    # Class-container for response where status, header and body are stored for further analysis
│   │   └── serviceName.service.ts # Specific service implementations, child of BaseService class
│   │
│   ├── features/                 # Behavior-Driven Development (BDD) features
│   │   └── serviceName/
│   │       └── featureName.feature
│   ├── utils/                    # Utility functions, helpers, syntax sugar
│   │   └── utils.ts              # Implementation of utility functions which can simlify code in different modules
│   │
│   └── stepDefinitions/          # Step definitions for BDD scenarios
│       ├──common/
│       │   └── common.stepDefinition.ts # common universal step definitions applicable for any scenario, no dependency on service- or endpoint- specific details 
│       └── serviceName/
│           └── featureName.stepDefinition.ts #implementation of steps specific to src\features\serviceName\featureName.feature
│
├── package.json
├── tsconfig.json
└── README.md
```

## Key Components Explained

### Service Contracts
- Located in `serviceContracts/` folder
- JSON files describing service contracts in Swagger-like format
- Provides a contract for API service specifications

### Configuration
- `src/config/environments.ts` manages:
  - Environment-specific configurations
  - Service endpoint mappings
  - Authentication details
  - Logging settings

### Models (DTOs)
- `src/models/` contains Data Transfer Objects (DTOs)
- `common.models.ts` for shared DTOs
- `<serviceName>.model.ts` for service-specific models
- Ensures type safety and consistent data representation

### Services
#### Base Service (`base.service.ts`)
- Core functionality for API interactions
- Manages configuration retrieval
- Handles response analysis
- Provides methods for HTTP methods:
  - GET
  - POST
  - PUT
  - DELETE
- Implements request/response logging
- Error handling mechanisms

#### Specific Service Implementation
- Extends `BaseService`
- Implements service-specific endpoint interactions
- Utilizes DTO classes for request/response bodies
- Provides public methods for specific endpoint operations

### Testing Approaches
- Behavior-Driven Development (BDD) using Cucumber
- Feature files for service endpoint testing
- Supports both positive and negative test scenarios
- Step definitions for test implementation

## Features
- TypeScript for strong typing
- Cucumber for BDD testing
- Modular and extensible architecture
- Environment-agnostic design
- Comprehensive logging
- Easy-to-extend service implementations

## Setup and Installation
1. Prerequisites:
   - Node.js (v16+ recommended)
   - npm (v8+)

2. Clone the repository
   ```bash
   git clone https://github.com/juliaviluhina/taf_rest_api_template.git
   cd taf_rest_api_template
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Configure environments
   - Edit `src/config/environments.ts`
   - Set up service endpoints, credentials

## Running Tests
```bash
# Run tests in different environments
npm run test:dev        # Development environment
npm run test:stage      # Staging environment
npm run test:uat       # UAT environment

# Run specific feature
npm run test -- --name "Feature Name"

# Generate test reports
npm run report
```

## Best Practices
- Keep service contracts updated
- Maintain clear and descriptive feature files
- Use meaningful variable and method names
- Add comprehensive logging
- Handle edge cases in step definitions
- Implement proper error handling

## Contributing
1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/new-test-suite
   ```
3. Commit changes with descriptive messages
4. Push to your branch
5. Create a Pull Request

## Troubleshooting
- Ensure all dependencies are installed
- Check environment configurations
- Verify service contract accuracy
- Review step definition implementations

## License
MIT License
