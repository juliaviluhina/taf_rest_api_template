import { When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { WizardWorldService } from '../../services/wizardWorld.service';
import { ServiceValidations } from '../../services/base/service.validations';
import { 
  ElixirDto, 
  ElixirDifficulty 
} from '../../models/wizardWorld.model';
import { CustomWorld } from '../../support/world';

// Utility function to send GET request to Elixirs endpoint
async function sendElixirsRequest(
  customWorld: CustomWorld,
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
  customWorld.storeResponse(response);
  return response;
}

When('I send a GET request to the Elixirs endpoint with no parameters', async function (this: CustomWorld) {
  await sendElixirsRequest(this);
});

Then('each elixir should have a valid structure', async function (this: CustomWorld) {
  const actualResponse = this.retrieveResponse<ElixirDto[]>();
  
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

When('I send a GET request to the Elixirs endpoint with Name parameter {string}', async function (this: CustomWorld, name: string) {
  await sendElixirsRequest(this, name);
});

Then('the response body should contain elixirs with name {string}', async function (this: CustomWorld, expectedName: string) {
  const actualResponse = this.retrieveResponse<ElixirDto[]>();
  
  const matchingElixirs = actualResponse.body.filter(elixir => elixir.name === expectedName);
  
  expect(matchingElixirs).to.have.length.greaterThan(0, 
    `No elixirs found with name: ${expectedName}`
  );
});

When('I send a GET request to the Elixirs endpoint with Difficulty parameter {word}', async function (this: CustomWorld, difficulty: ElixirDifficulty) {
  await sendElixirsRequest(this, undefined, difficulty);
});

Then('all returned elixirs should have difficulty {word}', async function (this: CustomWorld, expectedDifficulty: ElixirDifficulty) {
  const actualResponse = this.retrieveResponse<ElixirDto[]>();
  
  actualResponse.body.forEach(elixir => {
    expect(elixir.difficulty).to.equal(expectedDifficulty, 
      `Expected elixir difficulty to be ${expectedDifficulty}, but got ${elixir.difficulty}`
    );
  });
});

When('I send a GET request to the Elixirs endpoint with Ingredient parameter {string}', async function (this: CustomWorld, ingredient: string){
  await sendElixirsRequest(this, undefined, undefined, ingredient);
});

Then('at least one returned elixir should contain an ingredient with name {string}', async function (this: CustomWorld, ingredientName: string) {
  const actualResponse = this.retrieveResponse<ElixirDto[]>();
  
  const matchingElixirs = actualResponse.body.filter(elixir => 
    elixir.ingredients && 
    elixir.ingredients.some(ing => ing.name === ingredientName)
  );
  
  expect(matchingElixirs).to.have.length.greaterThan(0, 
    `No elixirs found containing ingredient: ${ingredientName}`
  );
});

When('I send a GET request to the Elixirs endpoint with InventorFullName parameter {string}', async function (this: CustomWorld, inventorFullName: string) {
  await sendElixirsRequest(this, undefined, undefined, undefined, inventorFullName);
});

Then('at least one returned elixir should have an inventor with the full name {string}', async function (this: CustomWorld, fullName: string) {
  const actualResponse = this.retrieveResponse<ElixirDto[]>();
  
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
When('I send a GET request to the Elixirs endpoint with Manufacturer parameter {string}', async function (this: CustomWorld, manufacturer: string) {
  await sendElixirsRequest(this, undefined, undefined, undefined, undefined, manufacturer);
});

Then('all returned elixirs should have the manufacturer {string}', async function (this: CustomWorld, expectedManufacturer: string) {
  const actualResponse = this.retrieveResponse<ElixirDto[]>();
  
  actualResponse.body.forEach(elixir => {
    expect(elixir.manufacturer).to.equal(expectedManufacturer, 
      `Expected elixir manufacturer to be ${expectedManufacturer}, but got ${elixir.manufacturer}`
    );
  });
});

