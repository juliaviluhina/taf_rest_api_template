Feature: Elixirs Endpoint Functionality
  As a user of the Wizard World API
  I want to retrieve elixirs with various search parameters
  So that I can find specific elixir information

  Scenario Outline: Search elixirs by name
    When I send a GET request to the Elixirs endpoint with Name parameter "<ElixirName>"
    Then the response status code should be 200
    And the response body should contain elixirs with name "<ElixirName>"

    Examples:
      | ElixirName                |
      | Skele-Gro                 |
      | Strength Potion           |
      | Draught of Peace          |

  @positive @service-wizardWorld @name-search
  Scenario Outline: Search elixirs by name
    When I send a GET request to the Elixirs endpoint with Name parameter "<ElixirName>"
    Then the response status code should be 200
    And the response body should contain elixirs with name "<ElixirName>"

    Examples:
      | ElixirName                |
      | Skele-Gro                 |
      | Strength Potion           |
      | Draught of Peace          |

  @positive @service-wizardWorld
  Scenario: Retrieve all elixirs
    When I send a GET request to the Elixirs endpoint with no parameters
    Then the response status code should be 200
    And the response body should be a non-empty array
    And each elixir should have a valid structure

  @positive @service-wizardWorld @difficulty-search
  Scenario Outline: Search elixirs by difficulty
    When I send a GET request to the Elixirs endpoint with Difficulty parameter "<Difficulty>"
    Then the response status code should be 200
    And all returned elixirs should have difficulty "<Difficulty>"

    Examples:
      | Difficulty    |
      | Beginner      |
      | Advanced      |
      | Moderate      |
      | Unknown       |    

   @positive @service-wizardWorld @ingredient-search
  Scenario Outline: Search elixirs by ingredient
    When I send a GET request to the Elixirs endpoint with Ingredient parameter "<IngredientName>"
    Then the response status code should be 200
    And at least one returned elixir should contain an ingredient with name "<IngredientName>"

    Examples:
      | IngredientName            |
      | Neem oil                  |
      | Unicorn blood             |
      | Powdered Porcupine quills |

  @positive @service-wizardWorld @inventor-search
  Scenario Outline: Search elixirs by inventor full name
    When I send a GET request to the Elixirs endpoint with InventorFullName parameter "<InventorName>"
    Then the response status code should be 200
    And at least one returned elixir should have an inventor with the full name "<InventorName>"

    Examples:
      | InventorName                 |
      | Linfred of Stinchcombe       |
      | Fleamont Potter              |     

  @positive @service-wizardWorld @manufacturer-search
  Scenario Outline: Search elixirs by manufacturer
    When I send a GET request to the Elixirs endpoint with Manufacturer parameter "<ManufacturerName>"
    Then the response status code should be 200
    And all returned elixirs should have the manufacturer "<ManufacturerName>"

    Examples:
      | ManufacturerName                                         |
      | Rubens Winikus and Company Inc.                          |
      | Magical Congress of the United States of America         |    

  @negative @service-wizardWorld @name-search
  Scenario: Search elixirs with non-existent name
    When I send a GET request to the Elixirs endpoint with Name parameter "Non-Existent Elixir"
    Then the response status code should be 200
    And the response body should be an empty array

  @negative @service-wizardWorld @difficulty-search
  Scenario: Search elixirs with invalid difficulty
    When I send a GET request to the Elixirs endpoint with Difficulty parameter "Invalid Difficulty"
    Then the response status code should be 400
    And the response should contain an error message

  @negative @service-wizardWorld @ingredient-search
  Scenario: Search elixirs with non-existent ingredient
    When I send a GET request to the Elixirs endpoint with Ingredient parameter "Imaginary Ingredient"
    Then the response status code should be 200
    And the response body should be an empty array

  @negative @service-wizardWorld @inventor-search
  Scenario: Search elixirs with non-existent inventor
    When I send a GET request to the Elixirs endpoint with InventorFullName parameter "Fictional Wizard"
    Then the response status code should be 200
    And the response body should be an empty array

  @negative @service-wizardWorld @manufacturer-search
  Scenario: Search elixirs with non-existent manufacturer
    When I send a GET request to the Elixirs endpoint with Manufacturer parameter "Fictitious Company"
    Then the response status code should be 200
    And the response body should be an empty array     