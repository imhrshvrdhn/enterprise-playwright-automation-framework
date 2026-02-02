import { test, expect } from '@playwright/test';
import LoginPage from "../pages/loginPage";


test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();

  await loginPage.fillUserName("harsh.vardhan.8e983a9d4c07@agentforce.com");

  await loginPage.fillPassword("");

  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
});
