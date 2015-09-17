Feature: agreable-promo-plugin
  Test the Promo plugin for competition and promo entries

  Scenario: Enter a promo successfully
    Given I am on "/?p=814&preview=1&_ppp=ad21c92d76"
    When I click ".agreable-promo__button--enter"
    And I type a random email address in to ".agreable-promo__input[type='Email']"
    And I type a "FirstNameTest" in to "[name='firstName']"
    And I type a "LastNameTest" in to "[name='lastName']"
    And I click "[name='terms-and-conditions']"
    And I click submit
    Then I should see success message
