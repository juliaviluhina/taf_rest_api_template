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
