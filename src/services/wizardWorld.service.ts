import { BaseService} from './base/base.service';
import { filterDefinedParams } from '../utils/utils';
import { ApiResponse } from './base/apiResponse';
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
    constructor() {
        super('wizardWorld');
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
        return this.sendGet('Wizards',[], queryParams);
    }

    /**
     * Send request to retrieve a specific wizard by ID
     * @param id - Wizard's unique identifier
     * @returns ApiResponse with WizardDto
     */
    async getWizardById(id: string): Promise<ApiResponse<WizardDto>> {
        return this.sendGet('Wizards',[id], undefined);
    }

    // Houses Endpoints
    /**
     * Send request to retrieve houses
     * @returns ApiResponse with HouseDto array
     */
    async getHouses(): Promise<ApiResponse<HouseDto[]>> {
        return this.sendGet('Houses', [], undefined);
    }

    /**
     * Send request to retrieve a specific house by ID
     * @param id - House's unique identifier
     * @returns ApiResponse with HouseDto
     */
    async getHouseById(id: string): Promise<ApiResponse<HouseDto>> {
        return this.sendGet('Houses', [id], undefined);
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
        return this.sendGet('Spells',[], queryParams);
    }

    /**
     * Send request to retrieve a specific spell by ID
     * @param id - Spell's unique identifier
     * @returns ApiResponse with SpellDto
     */
    async getSpellById(id: string): Promise<ApiResponse<SpellDto>> {
        return this.sendGet('Spells', [id], undefined);
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
        return this.sendGet('Elixirs', [], queryParams);
    }

    // Ingredients Endpoints
    /**
     * Send request to retrieve ingredients
     * @param name - Optional ingredient name filter
     * @returns ApiResponse with IngredientDto array
     */
    async getIngredients(name?: string): Promise<ApiResponse<IngredientDto[]>> {
        return this.sendGet('Ingredients', [], filterDefinedParams({
            Name: name
        }));
    }

    /**
     * Send request to retrieve a specific ingredient by ID
     * @param id - Ingredient's unique identifier
     * @returns ApiResponse with IngredientDto
     */
    async getIngredientById(id: string): Promise<ApiResponse<IngredientDto>> {
        return this.sendGet('Ingredients', [id], undefined);
    }

    // Feedback Endpoint
    /**
     * Send feedback to the API
     * @param feedbackCommand - Feedback details
     * @returns ApiResponse with void
     */
    async postFeedback(feedbackCommand: SendFeedbackCommand): Promise<ApiResponse<void>> {
        return this.sendPost('Feedback', [], feedbackCommand);
    }
}