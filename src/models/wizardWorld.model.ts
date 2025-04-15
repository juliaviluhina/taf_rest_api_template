/**
 * Wizard World Service Models
 * Generated based on service contract in wizardWorld.json
 */

// Enums
export enum ElixirDifficulty {
  Unknown = 'Unknown',
  Advanced = 'Advanced', 
  Moderate = 'Moderate',
  Beginner = 'Beginner',
  OrdinaryWizardingLevel = 'OrdinaryWizardingLevel',
  OneOfAKind = 'OneOfAKind'
}

export enum SpellType {
  None = 'None',
  Charm = 'Charm',
  Conjuration = 'Conjuration',
  Spell = 'Spell',
  Transfiguration = 'Transfiguration',
  HealingSpell = 'HealingSpell',
  DarkCharm = 'DarkCharm',
  Jinx = 'Jinx',
  Curse = 'Curse',
  MagicalTransportation = 'MagicalTransportation',
  Hex = 'Hex',
  CounterSpell = 'CounterSpell',
  DarkArts = 'DarkArts',
  CounterJinx = 'CounterJinx',
  CounterCharm = 'CounterCharm',
  Untransfiguration = 'Untransfiguration',
  BindingMagicalContract = 'BindingMagicalContract',
  Vanishment = 'Vanishment'
}

export enum SpellLight {
  None = 'None',
  Blue = 'Blue',
  IcyBlue = 'IcyBlue',
  Red = 'Red',
  Gold = 'Gold',
  Purple = 'Purple',
  Transparent = 'Transparent',
  White = 'White',
  Green = 'Green',
  Orange = 'Orange',
  Yellow = 'Yellow',
  BrightBlue = 'BrightBlue',
  Pink = 'Pink',
  Violet = 'Violet',
  BlueishWhite = 'BlueishWhite',
  Silver = 'Silver',
  Scarlet = 'Scarlet',
  Fire = 'Fire',
  FieryScarlet = 'FieryScarlet',
  Grey = 'Grey',
  DarkRed = 'DarkRed',
  Turquoise = 'Turquoise',
  PsychedelicTransparentWave = 'PsychedelicTransparentWave',
  BrightYellow = 'BrightYellow',
  BlackSmoke = 'BlackSmoke'
}

export enum FeedbackType {
  General = 'General',
  Bug = 'Bug',
  DataError = 'DataError',
  Suggestion = 'Suggestion'
}

export enum TraitName {
  None = 'None',
  Courage = 'Courage',
  Bravery = 'Bravery',
  Determination = 'Determination',
  Daring = 'Daring',
  Nerve = 'Nerve',
  Chivalary = 'Chivalary',
  Hardworking = 'Hardworking',
  Patience = 'Patience',
  Fairness = 'Fairness',
  Just = 'Just',
  Loyalty = 'Loyalty',
  Modesty = 'Modesty',
  Wit = 'Wit',
  Learning = 'Learning',
  Wisdom = 'Wisdom',
  Acceptance = 'Acceptance',
  Inteligence = 'Inteligence',
  Creativity = 'Creativity',
  Resourcefulness = 'Resourcefulness',
  Pride = 'Pride',
  Cunning = 'Cunning',
  Ambition = 'Ambition',
  Selfpreservation = 'Selfpreservation'
}

// Base Interfaces
export interface BaseDto {
  id: string;
}

// DTOs
export interface ElixirInventorDto extends BaseDto {
  firstName?: string;
  lastName?: string;
}

export interface WizardElixirDto extends BaseDto {
  name?: string;
}

export interface IngredientDto extends BaseDto {
  name?: string;
}

export interface TraitDto extends BaseDto {
  name: TraitName;
}

export interface HouseHeadDto extends BaseDto {
  firstName?: string;
  lastName?: string;
}

export interface ElixirDto extends BaseDto {
  name?: string;
  effect?: string;
  sideEffects?: string;
  characteristics?: string;
  time?: string;
  difficulty: ElixirDifficulty;
  ingredients?: IngredientDto[];
  inventors?: ElixirInventorDto[];
  manufacturer?: string;
}

export interface WizardDto extends BaseDto {
  firstName?: string;
  lastName?: string;
  elixirs?: WizardElixirDto[];
}

export interface HouseDto extends BaseDto {
  name?: string;
  houseColours?: string;
  founder?: string;
  animal?: string;
  element?: string;
  ghost?: string;
  commonRoom?: string;
  heads?: HouseHeadDto[];
  traits?: TraitDto[];
}

export interface SpellDto extends BaseDto {
  name?: string;
  incantation?: string;
  effect?: string;
  canBeVerbal?: boolean;
  type: SpellType;
  light: SpellLight;
  creator?: string;
}

// Request/Response Interfaces
export interface SendFeedbackCommand {
  feedbackType: FeedbackType;
  feedback?: string;
  entityId?: string;
}

export interface GetHousesQuery {
  // Currently empty as per the original contract
}

// Search Criteria Interfaces
export interface ElixirSearchCriteria {
  Name?: string;
  Difficulty?: ElixirDifficulty;
  Ingredient?: string;
  InventorFullName?: string;
  Manufacturer?: string;
}

export interface WizardSearchCriteria {
  FirstName?: string;
  LastName?: string;
}

export interface SpellSearchCriteria {
  Name?: string;
  Type?: SpellType;
  Incantation?: string;
}
