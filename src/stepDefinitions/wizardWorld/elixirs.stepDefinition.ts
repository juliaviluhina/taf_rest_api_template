import { When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { WizardWorldService } from '../../services/wizardWorld.service';
import { ServiceValidations } from '../../services/base/service.validations';
import { 
  ElixirDto, 
  ElixirDifficulty 
} from '../../models/wizardWorld.model';
import { ApiResponse } from '../../services/base/apiResponse';
import CustomWorld from '../common/world';

// Utility function to send GET request to Elixirs endpoint
async function sendElixirsRequest(
  dataStorage: CustomWorld,
  name?: string, 
  difficulty?: ElixirDifficulty, 
  ingredient?: string, 
  inventorFullName?: string, 
  manufacturer?: string
) {
  const wizardWorldService = new WizardWorldService();
  const response = await wizardWorldService.getElixirs(
    name, 
    difficulty, 
    ingredient, 
    inventorFullName, 
    manufacturer
  );
  
  // Store the response data for future validation steps
  dataStorage.storeData('elixirsResponse', response);
  return response;
}

// Scenario: Retrieve all elixirs
When('I send a GET request to the /Elixirs endpoint', async (dataStorage: CustomWorld) => {
  await sendElixirsRequest(dataStorage);
});

// Status code validation
Then('the response status code should be {int}', (dataStorage: CustomWorld, expectedStatus: number) => {
  const actualResponse = dataStorage.retrieveData<ApiResponse<ElixirDto[]>>('elixirsResponse');
  const serviceValidations = new ServiceValidations();
  
  // Use the service validation method to check status code
  serviceValidations.validateSuccessValidResponse(actualResponse, expectedStatus);
});

// Non-empty array validation
Then('the response body should be a non-empty array of elixirs', (dataStorage: CustomWorld) => {
  const actualResponse = dataStorage.retrieveData<ApiResponse<ElixirDto[]>>('elixirsResponse');
  
  expect(actualResponse.body).to.be.an('array').that.is.not.empty;
});

// Elixir structure validation
Then('each elixir should have a valid structure', (dataStorage: CustomWorld) => {
  const actualResponse = dataStorage.retrieveData<ApiResponse<ElixirDto[]>>('elixirsResponse');
  
  // Custom validation function for elixir structure
  const validateElixirStructure = (elixirs: ElixirDto[]) => {
    return elixirs.every(elixir => 
      elixir.id !== undefined && 
      typeof elixir.id === 'string' &&
      elixir.name !== undefined && 
      elixir.difficulty !== undefined
    );
  };

  const serviceValidations = new ServiceValidations();
  
  // Use the service validation method with a custom body validator
  serviceValidations.validateSuccessValidResponse(
    actualResponse, 
    200, 
    validateElixirStructure
  );
});

// Scenario: Search elixirs by name
When('I send a GET request to the /Elixirs endpoint with Name parameter {string}', async (dataStorage: CustomWorld, name: string) => {
  await sendElixirsRequest(dataStorage, name);
});

Then('the response body should contain elixirs with name {string}', (dataStorage: CustomWorld, expectedName: string) => {
  const actualResponse : ApiResponse<ElixirDto[]> = dataStorage.retrieveData<ApiResponse<ElixirDto[]>>('elixirsResponse');
  
  const matchingElixirs = actualResponse.body.filter(elixir => elixir.name === expectedName);
  
  expect(matchingElixirs).to.have.length.greaterThan(0, 
    `No elixirs found with name: ${expectedName}`
  );
});

// Scenario: Search elixirs by difficulty
When('I send a GET request to the /Elixirs endpoint with Difficulty parameter {word}', async (dataStorage: CustomWorld, difficulty: ElixirDifficulty) => {
  await sendElixirsRequest(dataStorage, undefined, difficulty);
});

Then('all returned elixirs should have difficulty {word}', (dataStorage: CustomWorld, expectedDifficulty: ElixirDifficulty) => {
  const actualResponse: ApiResponse<ElixirDto[]> = dataStorage.retrieveData<ApiResponse<ElixirDto[]>>('elixirsResponse');
  
  actualResponse.body.forEach(elixir => {
    expect(elixir.difficulty).to.equal(expectedDifficulty, 
      `Expected elixir difficulty to be ${expectedDifficulty}, but got ${elixir.difficulty}`
    );
  });
});

// Scenario: Search elixirs by ingredient
When('I send a GET request to the /Elixirs endpoint with Ingredient parameter {string}', async (dataStorage: CustomWorld, ingredient: string) => {
  await sendElixirsRequest(dataStorage, undefined, undefined, ingredient);
});

Then('at least one returned elixir should contain an ingredient with name {string}', (dataStorage: CustomWorld, ingredientName: string) => {
  const actualResponse: ApiResponse<ElixirDto[]> = dataStorage.retrieveData<ApiResponse<ElixirDto[]>>('elixirsResponse');
  
  const matchingElixirs = actualResponse.body.filter(elixir => 
    elixir.ingredients && 
    elixir.ingredients.some(ing => ing.name === ingredientName)
  );
  
  expect(matchingElixirs).to.have.length.greaterThan(0, 
    `No elixirs found containing ingredient: ${ingredientName}`
  );
});

// Scenario: Search elixirs by inventor full name
When('I send a GET request to the /Elixirs endpoint with InventorFullName parameter {string}', async (dataStorage: CustomWorld, inventorFullName: string) => {
  await sendElixirsRequest(dataStorage, undefined, undefined, undefined, inventorFullName);
});

Then('at least one returned elixir should have an inventor with the full name {string}', (dataStorage: CustomWorld, fullName: string) => {
  const actualResponse: ApiResponse<ElixirDto[]> = dataStorage.retrieveData<ApiResponse<ElixirDto[]>>('elixirsResponse');
  
  const [firstName, lastName] = fullName.split(' ');
  
  const matchingElixirs = actualResponse.body.filter(elixir => 
    elixir.inventors && 
    elixir.inventors.some(inv => 
      inv.firstName === firstName && 
      inv.lastName === lastName
    )
  );
  
  expect(matchingElixirs).to.have.length.greaterThan(0, 
    `No elixirs found with inventor: ${fullName}`
  );
});

// Scenario: Search elixirs by manufacturer
When('I send a GET request to the /Elixirs endpoint with Manufacturer parameter {string}', async (dataStorage: CustomWorld, manufacturer: string) => {
  await sendElixirsRequest(dataStorage, undefined, undefined, undefined, undefined, manufacturer);
});

Then('all returned elixirs should have the manufacturer {string}', (dataStorage: CustomWorld, expectedManufacturer: string) => {
  const actualResponse: ApiResponse<ElixirDto[]> = dataStorage.retrieveData<ApiResponse<ElixirDto[]>>('elixirsResponse');
  
  actualResponse.body.forEach(elixir => {
    expect(elixir.manufacturer).to.equal(expectedManufacturer, 
      `Expected elixir manufacturer to be ${expectedManufacturer}, but got ${elixir.manufacturer}`
    );
  });
});

// Negative Scenarios
// Non-existent name
Then('the response body should be an empty array', (dataStorage: CustomWorld) => {
  const actualResponse = dataStorage.retrieveData<ApiResponse<ElixirDto[]>>('elixirsResponse');
  
  expect(actualResponse.body).to.be.an('array').that.is.empty;
});

// Invalid difficulty (error case)
Then('the response should contain an error message', (dataStorage: CustomWorld) => {
  const actualResponse: ApiResponse<ElixirDto[]> = dataStorage.retrieveData<ApiResponse<ElixirDto[]>>('elixirsResponse');
  
  // This might need adjustment based on actual error response structure
  expect(actualResponse.body).to.have.property('message');
});