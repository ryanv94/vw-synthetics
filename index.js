const { Builder, Browser, By, until } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");

const COOKIE_NAME = "";
const URL = "https://www.volkswagen.de/de/konfigurator.html/__app/id-4.app";

// Test Data
const testData = {
  salutation: "Herr",
  firstName: "Service",
  lastName: "VW",
  streetName: "RommelStrasse",
  streetNumber: "11",
  postalCode: "70565",
  city: "Stuttgart",
  email: "service-vw-scs@diconium.com",
};

(async () => {
  let browser = await new Builder().forBrowser(Browser.CHROME).build();

  // set screen size
  await browser.manage().window().setRect({ width: 1000, height: 1200 });

  try {
    // get url
    await browser.get(URL);
    // add suervey cookie
    await browser.manage().addCookie({ name: COOKIE_NAME, value: "0" });

    // add adblock cookie
    await browser.manage().addCookie({ name: "adblock", value: "1" });

    // START JOURNEY
    console.log(1, "close or ignore non-existent popup");
    await browser
      .wait(
        until.elementLocated(
          By.xpath("//div[@aria-label='Consent Configuration']")
        )
      )
      .then(
        async () => {
          await browser
            .findElement(By.xpath("//button[@id='modalAcceptButton']"))
            .click()
            .catch(function (err) {
              console.log(1, "Popup cannot be closed");
              // throw err;
            });
        },
        (err) => {
          console.log(1, "popup not found");
        }
      );

    console.log(2, "clickElement Konfigurieren");
    await browser
      .wait(
        until.elementLocated(By.xpath("//a[@aria-label='Pro: Konfigurieren']"))
      )
      .then(function (el) {
        el.click();
      });

    // ADDITIONAL STEP TO CLOSE THE ADDITIONAL INFO DIALOG
    await browser
      .wait(until.elementLocated(By.xpath(`//div[@role="dialog"]//button`)))
      .then(function (el) {
        el.click();
      })
      .catch((err) => {
        console.log(err);
      });

    // const dialog = browser.findElement(By.xpath("//div[@role='dialog']"));
    // await browser.wait(until.elementIsNotVisible(dialog), 15000);

    console.log(3, "click 'Next step'");
    await browser
      .wait(
        until.elementLocated(
          By.xpath("//button[@data-testid='step-navigation-next-step-button']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(4, "click 'Next step'");
    await browser
      .wait(
        until.elementLocated(
          By.xpath("//button[@data-testid='step-navigation-next-step-button']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(5, "click 'Next step'");
    await browser
      .wait(
        until.elementLocated(
          By.xpath("//button[@data-testid='step-navigation-next-step-button']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(6, "click 'Next step'");
    await browser
      .wait(
        until.elementLocated(
          By.xpath("//button[@data-testid='step-navigation-next-step-button']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(7, "click 'Next step'");
    await browser
      .wait(
        until.elementLocated(
          By.xpath("//button[@data-testid='step-navigation-next-step-button']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(7, "click button 'Online leasen'");
    await browser
      .wait(
        until.elementLocated(
          By.xpath("//button/div[div[text()='Online leasen']]")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(8, "click button 'Als Gast fortfahren'");
    await browser
      .wait(
        until.elementLocated(
          By.xpath("//button[div[text()='Als Gast fortfahren']]")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(9, "click button 'Weiter'");
    await browser
      .wait(
        until.elementLocated(
          By.xpath("//button[@data-testid='how-to-navigation-button']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(10, "Fill in Personal Data form");
    console.log(10.1, "select salutation");
    await browser
      .wait(until.elementLocated(By.name("salutation")))
      .then(function (el) {
        el.click();
      })
      .then(async () => {
        let valueString = ("label=" + testData.salutation).split("=", 2);
        console.log(
          10.2,
          "select option " +
            valueString[1] +
            " from dropdown list name=salutation"
        );

        await browser
          .wait(until.elementLocated(By.name("salutation")))
          .then(function (el) {
            el.findElement(
              By.xpath('//option[.="' + valueString[1] + '"]')
            ).then(function (el) {
              el.isSelected().then(function (bool) {
                if (!bool) {
                  el.click();
                }
              });
            });
          });
      });

    console.log(10.3, "fill  in firstName");
    await browser
      .wait(until.elementLocated(By.name("firstName")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.firstName);
      });

    console.log(10.4, "fill  in lastName");
    await browser
      .wait(until.elementLocated(By.name("lastName")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.lastName);
      });

    console.log(10.5, "fill  in streetName");
    await browser
      .wait(until.elementLocated(By.name("streetName")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.streetName);
      });

    console.log(10.6, "fill  in streetNumber");
    await browser
      .wait(until.elementLocated(By.name("streetNumber")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.streetNumber);
      });

    console.log(10.7, "fill  in postalCode");
    await browser
      .wait(until.elementLocated(By.name("postalCode")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.postalCode);
      });

    console.log(10.8, "fill  in city");
    await browser
      .wait(until.elementLocated(By.name("city")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.city);
      });

    console.log(10.9, "fill  in email");
    await browser
      .wait(until.elementLocated(By.name("email")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.email);
      });

    console.log(11, "click 'Weiter");
    await browser
      .wait(until.elementLocated(By.xpath("//button[div[text()='Weiter']]")))
      .then(function (el) {
        el.click();
      });

    console.log(12, "click link 'Händler wählen'");
    await browser
      .wait(until.elementLocated(By.linkText("Händler wählen")))
      .then(function (el) {
        el.click();
      });

    console.log(13, "find local  dealer");
    console.log(13.1, "focus postcode input field");
    await browser
      .wait(until.elementLocated(By.name("search-input")))
      .then(function (el) {
        el.click();
      });

    // THIS IS VERY IMPORTANT !!!!!
    await browser.sleep(1000);

    console.log(13.1, "fill  in postcode");
    // await browser.switchTo().activeElement();
    await browser
      .wait(until.elementLocated(By.name("search-input")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.postalCode);
      });

    console.log(13.2, "click autosuggested item");
    await browser
      .wait(
        until.elementLocated(
          // By.xpath("//li[@role='group']//li[@role='autosuggestion-item']")
          By.xpath("//*[contains(text(), '70565')]")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(13.3, "click first dealer from the list");
    await browser
      .wait(
        until.elementLocated(By.xpath("//div[@data-cy='dealer-list-item']"))
      )
      .then(function (el) {
        el.click();
      });

    console.log(13.4, "click button 'Speichern'");
    await browser
      .wait(until.elementLocated(By.xpath("//button[@data-testid='button']")))
      .then(function (el) {
        el.click();
      });

    console.log(14, "select dealer from options");
    await browser
      .wait(
        until.elementLocated(
          By.xpath(
            "//div[@data-testid='option-group-pickup.volkswagen.sachsen-E21']"
          )
        )
      )
      .then(function (el) {
        el.click();
      });

    // const dialog = browser.findElement(By.xpath("//div[@role='dialog']"));
    // await browser.wait(until.elementIsNotVisible(dialog), 15000);

    console.log(15, "click 'Weiter'");
    await browser
      .wait(until.elementLocated(By.xpath("//button[div[text()='Weiter']]")))
      .then(async (el) => {
        // IMPORTANT - need to wait for the element to be enabled !!!!
        await browser.wait(until.elementIsEnabled(el));
        el.click();
      });

    console.log(16, "click 'Anpassen'");
    await browser
      .wait(
        until.elementLocated(
          By.xpath(
            "//div[@data-testid='paymentMethodOptions']//button[@type='button']"
          )
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(17, "select lease option S");
    await browser
      .wait(
        until.elementLocated(
          By.xpath("//label[@for='compare-and-select-webcalc-0']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(18, "click button 'Anwenden'");
    await browser
      .wait(until.elementLocated(By.xpath("//button[span[text()='Anwenden']]")))
      .then(function (el) {
        el.click();
      });

    console.log(19, "click 'Weiter'");
    await browser
      .wait(until.elementLocated(By.xpath("//button[@aria-label='Weiter']")))
      .then(async (el) => {
        // IMPORTANT - need to wait for the element to be enabled !!!!
        await browser.wait(until.elementIsEnabled(el));
        el.click();
      });

    console.log(20, "click 'Weiter'");
    await browser.sleep(2000);
    await browser
      .wait(until.elementLocated(By.xpath("//button[@aria-label='Weiter']")))
      .then(async (el) => {
        // IMPORTANT - need to wait for the element to be enabled !!!!
        await browser.wait(until.elementIsEnabled(el));
        el.click();
      });

    console.log(21, "click 'Weiter zur Vertragserstellung'");
    await browser
      .wait(
        until.elementLocated(
          By.xpath("//button[@aria-label='Weiter zur Vertragserstellung']")
        )
      )
      .then(function (el) {
        el.click();
      });

    // Page - LEASE CALCULATION RESULTS
    console.log(20, "wait for lease calculation results page");
    await browser.wait(until.elementLocated(By.id("ccc-notify")));
  } catch (error) {
    console.error("Script error:", error);
  } finally {
    await browser.quit();
  }
})();
