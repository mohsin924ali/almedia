import { expect } from "@playwright/test";
import { Page, Locator } from "playwright-core";

export default class LoginModal {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //    Elements

  private get cookiesButton(): Locator {
    return this.page.locator('button:text("Yes, I\'m happy!")').nth(0);
  }

  private get signinButton(): Locator {
    return this.page.locator(
      '//*[@id="freecash-loggedout-auth-container"]/button[1]'
    );
  }

  private get usernameField(): Locator {
    return this.page.locator('#email[placeholder="Type here..."]').nth(0);
  }

  private get passwordField(): Locator {
    return this.page.locator('#password[placeholder="Type here..."]').nth(0);
  }

  private get signinSubmitButton(): Locator {
    return this.page.locator('button:text("Sign In")');
  }

  private get profileButton(): Locator {
    return this.page.locator('button:text("mohsin924ali")');
  }

  private get settingsButton(): Locator {
    return this.page.locator('p:text("Settings")');
  }

  private get logoutButton(): Locator {
    return this.page.locator('button:text("Log out")');
  }

  private get logoutButtonPopup(): Locator {
    return this.page.locator('button:text("Log out")').nth(1);
  }
  //    Actions

  async signinSignout(username: string, password: string) {
    await this.cookiesButton.click();
    await this.signinButton.click();
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.signinSubmitButton.click();
    // await this.page.waitForURL("https://freecash.com/earn");
    // await expect(this.page).toHaveURL("https://freecash.com/earn");
    await this.profileButton.click();
    await this.settingsButton.click();
    await this.page.evaluate(() => {
      window.scrollBy(0, 500);
    });
    await this.logoutButton.click();
    await this.logoutButtonPopup.click();
  }

  async signinNegative(username: string, password: string) {
    await this.cookiesButton.click();
    for (let i = 0; i < 7; i++) {
      await this.signinButton.click();
      await this.usernameField.fill(username);
      await this.passwordField.fill(password + i);
      await this.signinSubmitButton.click();
      await this.page.waitForTimeout(3000);
      await this.page.bringToFront();
    }
  }
}
