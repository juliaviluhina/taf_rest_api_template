import { When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { WizardWorldService } from '../../services/wizardWorld.service';
import { ServiceValidations } from '../../services/base/service.validations';
import { 
  ElixirDto, 
  ElixirDifficulty 
} from '../../models/wizardWorld.model';
import { CustomWorld } from '../../support/world';


Then('the response status code should be {int}', async function (this: CustomWorld, expectedStatus: number) {
  const actualResponse = this.retrieveResponse<any>();
  const serviceValidations = new ServiceValidations();
  serviceValidations.validateSuccessValidResponse(actualResponse, expectedStatus);
});

Then('the response body should be a non-empty array', async function (this: CustomWorld) {
  const actualResponse = this.retrieveResponse<any>();
  expect(actualResponse.body).to.be.an('array').that.is.not.empty;
});

// Negative Scenarios
Then('the response body should be an empty array', async function (this: CustomWorld){
  const actualResponse = this.retrieveResponse<any>();
  expect(actualResponse.body).to.be.an('array').that.is.empty;
});

// Invalid difficulty (error case)
Then('the response should contain an error message', async function (this: CustomWorld){
  const actualResponse = this.retrieveResponse<any>();  
  // This might need adjustment based on actual error response structure
  expect(actualResponse.body).to.have.property('message');
});