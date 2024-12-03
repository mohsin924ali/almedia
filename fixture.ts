import { test as base } from "@playwright/test";
import LoginModal from "./pageobjects/loginModalPage";
import * as fs from "fs";

type UserData = {
  username: string;
  password: string;
  wrongPass1: string;
  wrongPass2: string;
  wrongPass3: string;
  urlHomepage: string;
};

const userData: UserData = JSON.parse(
  fs.readFileSync("./pageobjects/userData.json", "utf-8")
);

const fixtures = base.extend<{
  loginModal: LoginModal;
  userData: UserData;
}>({
  loginModal: async ({ page }, use) => {
    const loginModal = new LoginModal(page);
    await use(loginModal);
  },
  userData: async ({}, use) => {
    await use(userData);
  },
});

export { fixtures };
