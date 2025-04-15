import { BaseService, ApiResponse } from './base.service';
import { filterDefinedParams } from '../utils/utils';
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

    /**
     * Validate Wizard by ID response
     * @param response - API response to validate
     * @param expectedId - Expected wizard ID
     */
    validateWizardById(
        response: ApiResponse<WizardDto>,
        expectedId: string
    ): void {
        this.validateSuccessResponse(response, 200,
            (body) => body.id === expectedId
        );
    }

    // Houses Endpoints
    /**
     * Send request to retrieve houses
     * @returns ApiResponse with HouseDto array
     */
    async getHouses(): Promise<ApiResponse<HouseDto[]>> {
        return this.sendGet(['Houses']);
    }

    /**
     * Validate Houses response
     * @param response - API response to validate
     * @param expectedHouses - Optional expected houses for detailed validation
     */
    validateHouses(
        response: ApiResponse<HouseDto[]>,
        expectedHouses?: HouseDto[]
    ): void {
        this.validateSuccessResponse(response, 200,
            (body) => {
                // Check if it's an array
                if (!Array.isArray(body)) return false;

                // If expected houses provided, do more detailed validation
                if (expectedHouses) {
                    // Exact match
                    if (body.length !== expectedHouses.length) return false;

                    // Validate each house
                    return body.every((house, index) =>
                        this.validateSingleHouse(house, expectedHouses[index])
                    );
                }

                return true;
            }
        );
    }

    /**
     * Validate a single House DTO
     * @param house - House to validate
     * @param expectedHouse - Expected house details
     * @returns Validation result
     */
    private validateSingleHouse(house: HouseDto, expectedHouse?: HouseDto): boolean {
        if (!house) return false;

        // If expected house provided, do detailed validation
        if (expectedHouse) {
            return (
                (!expectedHouse.id || house.id === expectedHouse.id) &&
                (!expectedHouse.name || house.name === expectedHouse.name)
            );
        }

        return true;
    }

    /**
     * Send request to retrieve a specific house by ID
     * @param id - House's unique identifier
     * @returns ApiResponse with HouseDto
     */
    async getHouseById(id: string): Promise<ApiResponse<HouseDto>> {
        return this.sendGet(['Houses', id]);
    }

    /**
     * Validate House by ID response
     * @param response - API response to validate
     * @param expectedId - Expected house ID
     */
    validateHouseById(
        response: ApiResponse<HouseDto>,
        expectedId: string
    ): void {
        this.validateSuccessResponse(response, 200,
            (body) => body.id === expectedId
        );
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

    /**
     * Validate Spells response
     * @param response - API response to validate
     * @param expectedSpells - Optional expected spells for detailed validation
     */
    validateSpells(
        response: ApiResponse<SpellDto[]>,
        expectedSpells?: SpellDto[]
    ): void {
        this.validateSuccessResponse(response, 200,
            (body) => {
                // Check if it's an array
                if (!Array.isArray(body)) return false;

                // If expected spells provided, do more detailed validation
                if (expectedSpells) {
                    // Exact match
                    if (body.length !== expectedSpells.length) return false;

                    // Validate each spell
                    return body.every((spell, index) =>
                        this.validateSingleSpell(spell, expectedSpells[index])
                    );
                }

                return true;
            }
        );
    }

    /**
     * Validate a single Spell DTO
     * @param spell - Spell to validate
     * @param expectedSpell - Expected spell details
     * @returns Validation result
     */
    private validateSingleSpell(spell: SpellDto, expectedSpell?: SpellDto): boolean {
        if (!spell) return false;

        // If expected spell provided, do detailed validation
        if (expectedSpell) {
            return (
                (!expectedSpell.id || spell.id === expectedSpell.id) &&
                (!expectedSpell.name || spell.name === expectedSpell.name)
            );
        }

        return true;
    }

    /**
     * Send request to retrieve a specific spell by ID
     * @param id - Spell's unique identifier
     * @returns ApiResponse with SpellDto
     */
    async getSpellById(id: string): Promise<ApiResponse<SpellDto>> {
        return this.sendGet(['Spells', id]);
    }

    /**
     * Validate Spell by ID response
     * @param response - API response to validate
     * @param expectedId - Expected spell ID
     */
    validateSpellById(
        response: ApiResponse<SpellDto>,
        expectedId: string
    ): void {
        this.validateSuccessResponse(response, 200,
            (body) => body.id === expectedId
        );
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

    /**
     * Validate Elixirs response
     * @param response - API response to validate
     * @param expectedElixirs - Optional expected elixirs for detailed validation
     */
    validateElixirs(
        response: ApiResponse<ElixirDto[]>,
        expectedElixirs?: ElixirDto[]
    ): void {
        this.validateSuccessResponse(response, 200,
            (body) => {
                // Check if it's an array
                if (!Array.isArray(body)) return false;

                // If expected elixirs provided, do more detailed validation
                if (expectedElixirs) {
                    // Exact match
                    if (body.length !== expectedElixirs.length) return false;

                    // Validate each elixir
                    return body.every((elixir, index) =>
                        this.validateSingleElixir(elixir, expectedElixirs[index])
                    );
                }

                return true;
            }
        );
    }

    /**
     * Validate a single Elixir DTO
     * @param elixir - Elixir to validate
     * @param expectedElixir - Expected elixir details
     * @returns Validation result
     */
    private validateSingleElixir(elixir: ElixirDto, expectedElixir?: ElixirDto): boolean {
        if (!elixir) return false;

        // If expected elixir provided, do detailed validation
        if (expectedElixir) {
            return (
                (!expectedElixir.id || elixir.id === expectedElixir.id) &&
                (!expectedElixir.name || elixir.name === expectedElixir.name)
            );
        }

        return true;
    }

    /**
     * Send request to retrieve a specific elixir by ID
     * @param id - Elixir's unique identifier
     * @returns ApiResponse with ElixirDto
     */
    async getElixirById(id: string): Promise<ApiResponse<ElixirDto>> {
        return this.sendGet(['Elixirs', id]);
    }

    /**
     * Validate Elixir by ID response
     * @param response - API response to validate
     * @param expectedId - Expected elixir ID
     */
    validateElixirById(
        response: ApiResponse<ElixirDto>,
        expectedId: string
    ): void {
        this.validateSuccessResponse(response, 200,
            (body) => body.id === expectedId
        );
    }

    // Ingredients Endpoints
    /**
     * Send request to retrieve ingredients
     * @param name - Optional ingredient name filter
     * @returns ApiResponse with IngredientDto array
     */
    async getIngredients(name?: string): Promise<ApiResponse<IngredientDto[]>> {
        return this.sendGet(['Ingredients'], filterDefinedParams({
            Name: name
        }));
    }

    /**
     * Validate Ingredients response
     * @param response - API response to validate
     * @param expectedIngredients - Optional expected ingredients for detailed validation
     */
    validateIngredients(
        response: ApiResponse<IngredientDto[]>,
        expectedIngredients?: IngredientDto[]
    ): void {
        this.validateSuccessResponse(response, 200,
            (body) => {
                // Check if it's an array
                if (!Array.isArray(body)) return false;

                // If expected ingredients provided, do more detailed validation
                if (expectedIngredients) {
                    // Exact match
                    if (body.length !== expectedIngredients.length) return false;

                    // Validate each ingredient
                    return body.every((ingredient, index) =>
                        this.validateSingleIngredient(ingredient, expectedIngredients[index])
                    );
                }

                return true;
            }
        );
    }

    /**
     * Validate a single Ingredient DTO
     * @param ingredient - Ingredient to validate
     * @param expectedIngredient - Expected ingredient details
     * @returns Validation result
     */
    private validateSingleIngredient(
        ingredient: IngredientDto,
        expectedIngredient?: IngredientDto
    ): boolean {
        if (!ingredient) return false;

        // If expected ingredient provided, do detailed validation
        if (expectedIngredient) {
            return (
                (!expectedIngredient.id || ingredient.id === expectedIngredient.id) &&
                (!expectedIngredient.name || ingredient.name === expectedIngredient.name)
            );
        }

        return true;
    }

    /**
     * Send request to retrieve a specific ingredient by ID
     * @param id - Ingredient's unique identifier
     * @returns ApiResponse with IngredientDto
     */
    async getIngredientById(id: string): Promise<ApiResponse<IngredientDto>> {
        return this.sendGet(['Ingredients', id]);
    }

    /**
     * Validate Ingredient by ID response
     * @param response - API response to validate
     * @param expectedId - Expected ingredient ID
     */
    validateIngredientById(
        response: ApiResponse<IngredientDto>,
        expectedId: string
    ): void {
        this.validateSuccessResponse(response, 200,
            (body) => body.id === expectedId
        );
    }

    // Feedback Endpoint
    /**
     * Send feedback to the API
     * @param feedbackCommand - Feedback details
     * @returns ApiResponse with void
     */
    async postFeedback(feedbackCommand: SendFeedbackCommand): Promise<ApiResponse<void>> {
        return this.sendPost(['Feedback'], feedbackCommand);
    }

    /**
     * Validate Feedback response
     * @param response - API response to validate
     */
    validateFeedback(response: ApiResponse<void>): void {
        this.validateSuccessResponse(response, 200);
    }
}