<?php
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;
use Behat\Behat\Context\BehatContext,
  Behat\Behat\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode;

class FeatureContext extends BehatContext {
  private $webDriver;

  /** @Given /^I am on "([^"]*)"$/ */
  public function iAmOnSite($url) {
    $this->webDriver = RemoteWebDriver::create(
      "http://elliotcoad1:h7pd74y6rVjgwVid3EP8@hub.browserstack.com/wd/hub", 
      array("platform"=>"WINDOWS", "browserName"=>"firefox")
    );
    $this->webDriver->get('http://staging.emeraldstreet.com' . $url);
  }

  /**
   * @When /^I click "([^"]*)"$/
   */
  public function iClick($cssSelector) {
    $element = $this->webDriver->findElement(WebDriverBy::cssSelector($cssSelector));
    $element->click();
  }

  /**
   * @Given /^I type a "([^"]*)" in to "([^"]*)"$/
   */
  public function iTypeAInTo($inputString, $cssSelector) {
    $element = $this->webDriver->findElement(WebDriverBy::cssSelector($cssSelector));
    $element->sendKeys($inputString);
  }
  
  /**
   * @Given /^I type a random email address in to "([^"]*)"$/
   */
  public function iTypeARandomEmailAddressInTo($cssSelector) {
    $this->iTypeAInTo('automated-test-' . rand() . '@shortlistesting.com', $cssSelector);
  }

  /**
   * @Given /^I click submit$/
   */
  public function iClickSubmit() {
    $this->iClick('.agreable-promo__button--submit');
  }

  /**
   * @Then /^I should see success message$/
   */
  public function iShouldSeeSuccessMessage() {
    $this->webDriver->wait(20, 1000)->until(
      WebDriverExpectedCondition::visibilityOfElementLocated(WebDriverBy::className('agreable-promo__success-message'))
    );
    $this->webDriver->quit();
  }
}