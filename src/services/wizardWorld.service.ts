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

// Helper function to filter out undefined values
function filterDefinedParams<T extends Record<string, any>>(params?: T): Partial<T> {
  if (!params) return {};
  
  return Object.fromEntries(
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
  ) as Partial<T>;
}

export class WizardWorldService extends BaseService {
  constructor(env: string = 'development') {
    super('wizardWorld', env);
  }

  // Updated Wizards Endpoints
  async getWizards(criteria?: WizardSearchCriteria): Promise<ApiResponse<WizardDto[]>> {
    const queryParams = filterDefinedParams({
      FirstName: criteria?.FirstName,
      LastName: criteria?.LastName
    });

    return this.sendGet(['Wizards'], queryParams);
  }

  // Updated Spells Endpoints
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

  // Updated Elixirs Endpoints
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

  // Updated Ingredients Endpoints
  async getIngredients(name?: string): Promise<ApiResponse<IngredientDto[]>> {
    const queryParams = filterDefinedParams({
      Name: name
    });

    return this.sendGet(['Ingredients'], queryParams);
  }

  // Rest of the implementation remains the same...
  // Other methods like validateWizards, validateSpells, etc. are omitted for brevity
}