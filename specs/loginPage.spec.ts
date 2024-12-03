import { fixtures as test } from "../fixture";

test.describe("Feedback page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.only("Verify that user can login and logout of the app", async ({
    loginModal,
    userData,
  }) => {
    await loginModal.signinSignout(userData.username, userData.password);
  });

  test("Verify that system handles the multiple failed login attempts efficienlty", async ({
    loginModal,
    userData,
  }) => {
    await loginModal.signinNegative(userData.username, userData.password);
  });
});
