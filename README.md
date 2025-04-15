# REST API Test Automation Framework

## Overview
This is a comprehensive REST API Test Automation Framework designed to provide a robust, scalable, and maintainable solution for API testing.

## Project Structure
```
taf_rest_api_template/
│
├── src/                    # Source code directory
│   ├── config/             # Configuration management
│   │   ├── environments.ts # Environment-specific configurations
│   │   └── logger.ts       # Logging utility
│   │
│   ├── features/           # Behavior-Driven Development (BDD) features
│   │   ├── users/          # User-related feature tests
│   │   │   ├── users.feature
│   │   │   └── users.steps.ts
│   │   │
│   │   ├── posts/          # Posts-related feature tests
│   │   │   ├── posts.feature
│   │   │   └── posts.steps.ts
│   │
│   ├── services/           # API service layers
│   │   ├── base.service.ts # Base service with common API interactions
│   │   ├── users.service.ts
│   │   └── posts.service.ts
│   │
│   ├── models/             # TypeScript interfaces and type definitions
│   │   ├── user.model.ts
│   │   └── post.model.ts
│   │
│   └── utils/              # Utility functions and helpers
│       ├── api.helper.ts   # API-related helper functions
│       └── data.generator.ts # Test data generation
│
├── tests/                  # Additional test types
│   ├── integration/        # Integration test specs
│   │   └── api.spec.ts
│   └── performance/        # Performance testing
│       └── load.test.ts
│
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── cucumber.js             # Cucumber test runner configuration
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Key Components Explained

### 1. Configuration Management
- `src/config/environments.ts`: Manages different environment configurations
- Supports multiple environments (development, staging, production)
- Centralized configuration management

### 2. Services Layer
- `base.service.ts`: Abstract base class for API services
- Provides common functionality like:
  - Environment-based configuration
  - URL construction
  - Error handling
- Each service (e.g., `users.service.ts`) extends the base service

### 3. Models
- Defines TypeScript interfaces for data models
- Provides type safety
- Ensures consistent data structure across the application

### 4. Features (BDD)
- Implements Behavior-Driven Development approach
- Cucumber feature files describe test scenarios
- Step definitions implement the actual test logic

### 5. Utilities
- `data.generator.ts`: Generates test data
- `api.helper.ts`: Provides additional API-related helper functions

### 6. Testing Approaches
- Integration tests
- Performance tests
- BDD-style feature tests

## Features
- TypeScript for type safety
- Cucumber for BDD testing
- Supertest for API interactions
- Faker for test data generation
- Flexible environment configuration
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
ISC License
