import { BaseService, ApiResponse } from './base.service';
import { 
  WizardDto, 
  HouseDto, 
  SpellDto, 
  ElixirDto, 
  IngredientDto,
  SpellType,
  WizardSearchCriteria,
  SendFeedbackCommand,
  FeedbackType
} from '../models/wizardWorld.model';

/**
 * Helper function to filter out undefined values from an object
 * @param params Object with potentially undefined values
 * @returns Object with only defined values
 */
function filterDefinedParams<T extends Record<string, any>>(params?: T): Partial<T> {
  if (!params) return {};
  
  return Object.fromEntries(
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
  ) as Partial<T>;
}

/**
 * WizardWorldService provides specific implementations 
 * for Wizard World API endpoints
 * - Extends BaseService with service-specific methods
 * - Implements all endpoints from the service contract
 * - Uses type-safe DTOs for requests and responses
 */
export class WizardWorldService extends BaseService {
  /**
   * Constructor initializes the service with default environment
   * @param env - Environment name (default: 'development')
   */
  constructor(env: string = 'development') {
    super('wizardWorld', env);
  }

  // Wizards Endpoints
  /**
   * Send request to retrieve wizards
   * @param criteria - Optional search criteria for wizards
   * @returns ApiResponse with WizardDto array
   */
  async getWizards(criteria?: WizardSearchCriteria): Promise<ApiResponse<WizardDto[]>> {
    const queryParams = filterDefinedParams({
      FirstName: criteria?.FirstName,
      LastName: criteria?.LastName
    });

    return this.sendGet(['Wizards'], queryParams);
  }

  /**
   * Validate Wizards response
   * @param response - API response to validate
   * @param expectedWizards - Optional expected wizards for detailed validation
   */
  validateWizards(
    response: ApiResponse<WizardDto[]>, 
    expectedWizards?: WizardDto[]
  ): void {
    this.validateSuccessResponse(response, 200, 
      (body) => {
        // Check if it's an array
        if (!Array.isArray(body)) return false;

        // If expected wizards provided, do more detailed validation
        if (expectedWizards) {
          // Exact match
          if (body.length !== expectedWizards.length) return false;

          // Validate each wizard
          return body.every((wizard, index) => 
            this.validateSingleWizard(wizard, expectedWizards[index])
          );
        }

        return true;
      }
    );
  }

  /**
   * Validate a single Wizard DTO
   * @param wizard - Wizard to validate
   * @param expectedWizard - Expected wizard details
   * @returns Validation result
   */
  private validateSingleWizard(wizard: WizardDto, expectedWizard?: WizardDto): boolean {
    if (!wizard) return false;

    // If expected wizard provided, do detailed validation
    if (expectedWizard) {
      return (
        (!expectedWizard.id || wizard.id === expectedWizard.id) &&
        (!expectedWizard.firstName || wizard.firstName === expectedWizard.firstName) &&
        (!expectedWizard.lastName || wizard.lastName === expectedWizard.lastName)
      );
    }

    return true;
  }

  /**
   * Send request to retrieve a specific wizard by ID
   * @param id - Wizard's unique identifier
   * @returns ApiResponse with WizardDto
   */
  async getWizardById(id: string): Promise<ApiResponse<WizardDto>> {
    return this.sendGet(['Wizards', id]);
  }

  // Spells Endpoints
  /**
   * Send request to retrieve spells
   * @param name - Optional spell name filter
   * @param type - Optional spell type filter
   * @param incantation - Optional incantation filter
   * @returns ApiResponse with SpellDto array
   */
  async getSpells(
    name?: string, 
    type?: SpellType, 
    incantation?: string
  ): Promise<ApiResponse<SpellDto[]>> {
    const queryParams = filterDefinedParams({
      Name: name,
      Type: type,
      Incantation: incantation
    });

    return this.sendGet(['Spells'], queryParams);
  }

  // Elixirs Endpoints
  /**
   * Send request to retrieve elixirs
   * @param name - Optional elixir name filter
   * @param difficulty - Optional difficulty filter
   * @param ingredient - Optional ingredient filter
   * @param inventorFullName - Optional inventor name filter
   * @param manufacturer - Optional manufacturer filter
   * @returns ApiResponse with ElixirDto array
   */
  async getElixirs(
    name?: string,
    difficulty?: string,
    ingredient?: string,
    inventorFullName?: string,
    manufacturer?: string
  ): Promise<ApiResponse<ElixirDto[]>> {
    const queryParams = filterDefinedParams({
      Name: name,
      Difficulty: difficulty,
      Ingredient: ingredient,
      InventorFullName: inventorFullName,
      Manufacturer: manufacturer
    });

    return this.sendGet(['Elixirs'], queryParams);
  }

  // Ingredients Endpoints
  /**
   * Send request to retrieve ingredients
   * @param name - Optional ingredient name filter
   * @returns ApiResponse with IngredientDto array
   */
  async getIngredients(name?: string): Promise<ApiResponse<IngredientDto[]>> {
    const queryParams = filterDefinedParams({
      Name: name
    });

    return this.sendGet(['Ingredients'], queryParams);
  }

  // Rest of the methods remain unchanged
  // Houses Endpoints, Validation methods, Feedback methods are the same as in previous implementation
}