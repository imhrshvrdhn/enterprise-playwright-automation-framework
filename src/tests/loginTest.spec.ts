import { test, expect } from '@playwright/test';
import LoginPage from "../pages/loginPage";
import { encrypt } from '../utils/CryptoUtil';
import { decrypt } from '../utils/CryptoUtil';
import { encryptEnvFile } from '../utils/EncryptEnvFile';


test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();

  await loginPage.fillUserName(decrypt(process.env.userid!));

  await loginPage.fillPassword(decrypt(process.env.password!));

  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
});

test.skip("sample env test encryption & decryption", async({page})=>{
  // const plaintext = 'Hello Mars!';
  // const encryptedText = encrypt(plaintext);
  // console.log('SALT: ', process.env.SALT);
  // console.log('Encrypted: ', encryptedText);
  // const decryptText = decrypt(encryptedText);
  // console.log(decryptText);
  encryptEnvFile();

})

