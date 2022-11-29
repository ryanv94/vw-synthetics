/**
 * Script Name: {VW ID.4 - Guest User Journey}
 *
 * description: Performs E2E testing for VW ID.4 | Guest checkout
 *
 * authors    : Vargheese Vettukallel
 * emails     : vargheese.vettukallel@diconium.com
 * version    : 0.0.3
 * 2021-05-18 : Refactored the checks with new single flow configurator and using Katalon to generate NR script
 */

/** CONFIGURATIONS **/
const ScriptTimeout = 300000;
// Script-wide timeout for all wait and waitAndFind functions (in ms)
const DefaultTimeout = 20000;

// Change to any User Agent you want to use.
// Leave as "default" or empty to use the Synthetics default.
const UserAgent = "One.Shop New Relic Synthetics";

// Configure WebShop URL
const url = "https://www.volkswagen.de/de/konfigurator.html/__app/id-4.app";

// Survey Cookie SID
const CookieName = $secure.COOKIE_NAME;

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

/** HELPER VARIABLES AND FUNCTIONS **/
const assert = require("assert"),
  By = $selenium.By,
  browser = $webDriver.manage(),
  until = $selenium.until;

console.log("Starting synthetics script: {VW ID.4 - Guest User Journey}");
console.log("Default timeout is set to " + DefaultTimeout / 1000 + " seconds");

// Setting User Agent is not then-able, so we do this first (if defined and not default)
$headers.add("User-Agent", UserAgent);
console.log("Setting User-Agent to " + UserAgent);

// Resizes the current window.
$browser.manage().window().setSize(2500, 2500);

// Get browser capabilities and do nothing with it, so that we start with a then-able command
$webDriver
  .getCapabilities()
  .then(function () {})
  .then(() => {
    logger.log(1, url);
    return $webDriver.get(url);
  })
  .then(() => {
    logger.log(2, "Adding adblock and survey handling cookies");
    $webDriver
      .manage()
      .addCookie({ name: CookieName, value: "0" })
      .then(function () {
        $webDriver
          .manage()
          .getCookie(CookieName)
          .then(function (cookie) {
            logger.log(2, "Checking survey handling cookies");
            console.log(cookie);
          });
      });
    $webDriver
      .manage()
      .addCookie({ name: "adblock", value: "1" })
      .then(function () {
        $webDriver
          .manage()
          .getCookie("adblock")
          .then(function (cookie) {
            logger.log(2, "Checking adblock cookies");
            console.log(cookie);
          });
      });
  })

  .then(async () => {
    console.log(1, "close or ignore non-existent popup");
    await $webDriver
      .wait(
        until.elementLocated(
          By.xpath("//div[@aria-label='Consent Configuration']")
        )
      )
      .then(
        async () => {
          await $webDriver
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
    await $webDriver
      .wait(
        until.elementLocated(By.xpath("//a[@aria-label='Pro: Konfigurieren']"))
      )
      .then(function (el) {
        el.click();
      });

    // ADDITIONAL STEP TO CLOSE THE ADDITIONAL INFO DIALOG
    await $webDriver
      .wait(until.elementLocated(By.xpath(`//div[@role="dialog"]//button`)))
      .then(function (el) {
        el.click();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(3, "click 'Next step'");
    await $webDriver
      .wait(
        until.elementLocated(
          By.xpath("//button[@data-testid='step-navigation-next-step-button']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(4, "click 'Next step'");
    await $webDriver
      .wait(
        until.elementLocated(
          By.xpath("//button[@data-testid='step-navigation-next-step-button']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(5, "click 'Next step'");
    await $webDriver
      .wait(
        until.elementLocated(
          By.xpath("//button[@data-testid='step-navigation-next-step-button']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(6, "click 'Next step'");
    await $webDriver
      .wait(
        until.elementLocated(
          By.xpath("//button[@data-testid='step-navigation-next-step-button']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(7, "click 'Next step'");
    await $webDriver
      .wait(
        until.elementLocated(
          By.xpath("//button[@data-testid='step-navigation-next-step-button']")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(7, "click button 'Online leasen'");
    await $webDriver
      .wait(
        until.elementLocated(
          By.xpath("//button/div[div[text()='Online leasen']]")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(8, "click button 'Als Gast fortfahren'");
    await $webDriver
      .wait(
        until.elementLocated(
          By.xpath("//button[div[text()='Als Gast fortfahren']]")
        )
      )
      .then(function (el) {
        el.click();
      });

    console.log(9, "click button 'Weiter'");
    await $webDriver
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
    await $webDriver
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

        await $webDriver
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
    await $webDriver
      .wait(until.elementLocated(By.name("firstName")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.firstName);
      });

    console.log(10.4, "fill  in lastName");
    await $webDriver
      .wait(until.elementLocated(By.name("lastName")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.lastName);
      });

    console.log(10.5, "fill  in streetName");
    await $webDriver
      .wait(until.elementLocated(By.name("streetName")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.streetName);
      });

    console.log(10.6, "fill  in streetNumber");
    await $webDriver
      .wait(until.elementLocated(By.name("streetNumber")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.streetNumber);
      });

    console.log(10.7, "fill  in postalCode");
    await $webDriver
      .wait(until.elementLocated(By.name("postalCode")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.postalCode);
      });

    console.log(10.8, "fill  in city");
    await $webDriver
      .wait(until.elementLocated(By.name("city")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.city);
      });

    console.log(10.9, "fill  in email");
    await $webDriver
      .wait(until.elementLocated(By.name("email")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.email);
      });

    console.log(11, "click 'Weiter");
    await $webDriver
      .wait(until.elementLocated(By.xpath("//button[div[text()='Weiter']]")))
      .then(function (el) {
        el.click();
      });

    console.log(12, "click link 'Händler wählen'");
    await $webDriver
      .wait(until.elementLocated(By.linkText("Händler wählen")))
      .then(function (el) {
        el.click();
      });

    console.log(13, "find local  dealer");
    console.log(13.1, "focus postcode input field");
    await $webDriver
      .wait(until.elementLocated(By.name("search-input")))
      .then(function (el) {
        el.click();
      });

    // THIS IS VERY IMPORTANT !!!!!
    await $webDriver.sleep(1000);
    console.log(13.1, "fill  in postcode");
    await $webDriver
      .wait(until.elementLocated(By.name("search-input")))
      .then(function (el) {
        el.clear();
        el.sendKeys(testData.postalCode);
      });

    console.log(13.2, "click autosuggested item");
    await $webDriver
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
    await $webDriver
      .wait(
        until.elementLocated(By.xpath("//div[@data-cy='dealer-list-item']"))
      )
      .then(function (el) {
        el.click();
      });

    console.log(13.4, "click button 'Speichern'");
    await $webDriver
      .wait(until.elementLocated(By.xpath("//button[@data-testid='button']")))
      .then(function (el) {
        el.click();
      });

    console.log(14, "select dealer from options");
    await $webDriver
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

    console.log(15, "click 'Weiter'");
    await $webDriver
      .wait(until.elementLocated(By.xpath("//button[div[text()='Weiter']]")))
      .then(async (el) => {
        // IMPORTANT - need to wait for the element to be enabled !!!!
        await $webDriver.wait(until.elementIsEnabled(el));
        el.click();
      });

    console.log(16, "click 'Anpassen'");
    await $webDriver
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
    await $webDriver
      .wait(
        until.elementLocated(
          By.xpath("//label[@for='compare-and-select-webcalc-0']")
        )
      )
      .then(async (el) => {
        // IMPORTANT - need to wait for the element to be enabled !!!!
        await $webDriver.wait(until.elementIsEnabled(el));
        el.click();
      });

    console.log(18, "click button 'Anwenden'");
    await $webDriver
      .wait(until.elementLocated(By.xpath("//button[span[text()='Anwenden']]")))
      .then(async (el) => {
        // IMPORTANT - need to wait for the element to be enabled !!!!
        await $webDriver.wait(until.elementIsEnabled(el));
        el.click();
      });

    console.log(19, "click 'Weiter'");
    await $webDriver
      .wait(until.elementLocated(By.xpath("//button[@aria-label='Weiter']")))
      .then(async (el) => {
        // IMPORTANT - need to wait for the element to be enabled !!!!
        await $webDriver.wait(until.elementIsEnabled(el));
        el.click();
      });

    console.log(20, "click 'Weiter'");
    await $webDriver
      .wait(until.elementLocated(By.xpath("//button[@aria-label='Weiter']")))
      .then(async (el) => {
        // IMPORTANT - need to wait for the element to be enabled !!!!
        await $webDriver.wait(until.elementIsEnabled(el));
        el.click();
      });

    console.log(20, "click 'Weiter zur Vertragserstellung'");
    await $webDriver
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
    await $webDriver.wait(until.elementLocated(By.id("ccc-notify")));
  })

  //  .then(() => {
  //       logger.log(33, "Checking Summary Page css=h2");
  //      $webDriver.sleep(5000)
  //       return waitAndFindElementByCss("h2").then(function (el){
  //           return el.getText().then(function (text){
  //               logger.log(33, text)
  //               assert.equal('Datenprüfung', text, 'Datenprüfung overview page cannot be reached')
  //           })
  //       })
  // })
  // .then(() => {
  //   logger.log(
  //     34,
  //     "clickElement //a[@data-testid='show-eu-tyres-anchor-link']"
  //   );
  //   $webDriver.sleep(2000);
  //   return waitAndFindElementByXpath(
  //     "//a[@data-testid='show-eu-tyres-anchor-link']"
  //   ).then(function (el) {
  //     el.click();
  //   });
  // })
  // .then(() => {
  //   logger.log(35, "Check h3 for  EU Reifenlabel");
  //   return waitAndFindElementByCss(
  //     "section[data-testid=eu_tyre_label] h3"
  //   ).then(function (el) {
  //     return el.getText().then(function (text) {
  //       logger.log(35, text);
  //       assert.equal(
  //         "EU-Reifenlabel",
  //         text,
  //         "EU Reifenlabel cannot be reached"
  //       );
  //     });
  //   });
  // })

  // .then(() => {
  //   logger.log(36, "Check Reifenlabel details");
  //   return waitAndFindElementByCss(
  //     "a[data-testid=eu_tyre_label_infosheet_link-anchor-link]"
  //   ).then(function (el) {
  //     return el.getText().then(function (text) {
  //       logger.log(40, text);
  //       assert.equal(
  //         "Produktdatenblatt herunterladen",
  //         text,
  //         "Tyre Details cannot be reached"
  //       );
  //     });
  //   });
  // })
  // .then(() => {
  //   logger.log(36, "clickElement Overlay_close-icon");
  //   return waitAndFindElementByXpath(
  //     "//button[@data-testid='Overlay_close-icon']"
  //   ).then(function (el) {
  //     el.click();
  //   });
  // })
  // .then(() => {
  //   logger.log(37, "Check ENVKV label");
  //   return waitAndFindElementByXpath(
  //     "//a[@data-testid='show-all-emissions-anchor-link']"
  //   ).then(function (el) {
  //     el.click();
  //   });
  // })
  // .then(() => {
  //   logger.log(37, "Check CO2-Effizienz details");
  //   return waitAndFindElementByCss("div[data-testid='co2-efficiency'] h3").then(
  //     function (el) {
  //       return el.getText().then(function (text) {
  //         logger.log(40, text);
  //         assert.equal(
  //           "CO2-Effizienz3",
  //           text,
  //           "CO2-Effizienz3 cannot be reached"
  //         );
  //       });
  //     }
  //   );
  // })
  // .then(() => {
  //   logger.log(37, "clickElement Overlay_close-icon");
  //   return waitAndFindElementByXpath(
  //     "//button[@data-testid='Overlay_close-icon']"
  //   ).then(function (el) {
  //     el.click();
  //   });
  // })

  .then(
    function () {
      logger.end();
      console.log("Browser script execution SUCCEEDED.");
    },
    function (err) {
      logger.end();
      console.log("Browser script execution FAILED.");
      throw err;
    }
  );

//** Export Functions
const logger = (function (timeout = 30000, mode = "production") {
  let startTime = Date.now(),
    stepStartTime = Date.now(),
    prevMsg = "",
    prevStep = 0;

  if (typeof $util == "undefined") {
    $util = {
      insights: {
        set: (msg) => {
          console.log(`dryRun: sending to Insights using ${msg}`);
        },
      },
    };
  }

  function log(thisStep, thisMsg) {
    if (thisStep > prevStep && prevStep !== 0) {
      end();
    }

    stepStartTime = Date.now() - startTime;

    if (mode !== "production") {
      stepStartTime = 0;
    }

    console.log(`Step ${thisStep}: ${thisMsg} STARTED at ${stepStartTime}ms.`);

    prevMsg = thisMsg;
    prevStep = thisStep;
  }

  function end() {
    let totalTimeElapsed = Date.now() - startTime;
    let prevStepTimeElapsed = totalTimeElapsed - stepStartTime;

    if (mode !== "production") {
      prevStepTimeElapsed = 0;
      totalTimeElapsed = 0;
    }

    console.log(
      `Step ${prevStep}: ${prevMsg} FINISHED. It took ${prevStepTimeElapsed}ms to complete.`
    );

    $util.insights.set(`Step ${prevStep}: ${prevMsg}`, prevStepTimeElapsed);
    if (timeout > 0 && totalTimeElapsed > timeout) {
      throw new Error(
        "Script timed out. " +
          totalTimeElapsed +
          "ms is longer than script timeout threshold of " +
          timeout +
          "ms."
      );
    }
  }

  return {
    log,
    end,
  };
})(ScriptTimeout);
