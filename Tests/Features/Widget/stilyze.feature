@mink:selenium2 @alice(Page) @alice(MediaFile) @reset-schema
Feature: Stylize a widget

  Background:
    Given I maximize the window
    And I am on homepage

  Scenario: Change color for small device
    When I switch to "layout" mode
    And I should see "Nouveau contenu"
    And I select "Force" from the "1" select of "main_content" slot
    And I wait 5 seconds
    Then I should see "Créer"
    When I fill in "Côté de la force" with "Obscure"
    And I submit the widget
    Then I wait 2 seconds
    And I should see "Le côté Obscure de la force"
    Then I switch to "edit" mode
    When I edit the "Force" widget
    Then I should see "Style"
    Then I follow "Style"
    And I fill in "_a_static_widget_force[containerBackgroundColor]" with "rgb(255, 0, 0)"
    And I fill in "_a_static_widget_force[containerBackgroundColorXS]" with "rgb(0, 0, 255)"
    And I follow "Mettre à jour"
    And I wait 2 seconds
    And I reload the page
    And I resize the window to 1600x900
    Then I should see the css property "background-color" of "widget-1" with "rgb(255, 0, 0)"
    When I minimize the window
    Then I should see the css property "background-color" of "widget-1" with "rgb(0, 0, 255)"

  Scenario: Change image for small device
    When I switch to "layout" mode
    And I should see "Nouveau contenu"
    And I select "Force" from the "1" select of "main_content" slot
    Then I should see "Créer"
    When I fill in "Côté de la force" with "Obscure"
    And I submit the widget
    Then I should see "Victoire !"
    Then I switch to "edit" mode
    When I edit the "Force" widget
    Then I should see "Style"
    Then I follow "Style"
    When I fill in "_a_static_widget_force[containerPadding]" with "100px"
    When I select "image" from "_a_static_widget_force[containerBackgroundType]"
    Then I should find css element "input" with selector "name" and value "_a_static_widget_force[containerBackgroundImage]"
    When I attach image with id "1" to victoire field "_a_static_widget_force_containerBackgroundImage_widget"
    When I fill in "_a_static_widget_force[containerPaddingXS]" with "100px"
    And I select "image" from "_a_static_widget_force[containerBackgroundTypeXS]"
    Then I should find css element "input" with selector "name" and value "_a_static_widget_force[containerBackgroundImageXS]"
    When I attach image with id "2" to victoire field "_a_static_widget_force_containerBackgroundImageXS_widget"
    And I follow "Mettre à jour"
    And I wait 5 seconds
    And I reload the page
    And I maximize the window
    Then I should see background-image of "widget-1" with relative url "/uploads/55953304833d5.jpg"
    When I minimize the window
    Then I should see background-image of "widget-1" with relative url "/uploads/55dc8d8a4c9d3.jpg"
