import { test, expect, Page } from '@playwright/test';
import LoginPage from "../pages/loginPage";
import { encrypt } from '../utils/CryptoUtil';
import { decrypt } from '../utils/CryptoUtil';
import { encryptEnvFile } from '../utils/EncryptEnvFile';
import logger from '../utils/LoggerUtil';
import cdata from "../testdata/contacts.json";
import {convertCsvFileToJsonFile} from "../utils/CsvtoJsonUtil";
import { exportToCSV, exportToJSON, generateTestData } from '../utils/FakerDataUtil';



for(const contact of cdata){
    test.skip(`Advance Data Driven test for ${contact.firstName}`, async({page})=>{
        logger.info("Test for contact creation is started...");
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.fillUserName(decrypt(process.env.userid!));
        await loginPage.fillPassword(decrypt(process.env.password!));
        const homePage = await loginPage.clickLoginButton();
        await homePage.expectServiceTitleToBeVisible();
        const contactsPage = await homePage.navigateToContactTab();
        await contactsPage.createNewContact(contact.firstName, contact.lastName);
        await contactsPage.expectContactLabelContainsFirstNameAndLastName(contact.firstName, contact.lastName);
        logger.info("Test for contact creation is completed");
    })
}



test("Simple Data driven test", async({page})=>{
    logger.info("Test for contact is started...");
    const fname = "Shiva";
    const lname = "Rudra";
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUserName(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();
    const contactsPage = await homePage.navigateToContactTab();
    await contactsPage.createNewContact(fname, lname);
    await contactsPage.expectContactLabelContainsFirstNameAndLastName(fname, lname);
    logger.info("Test for contact creation is completed");
});

test("csv to json", async()=>{
    convertCsvFileToJsonFile("data.csv", "datademo.json");
});

test("Faker", async({page})=>{
    //Generate test data
    const testData = generateTestData(20);

    //Export data to JSON file
    exportToJSON(testData, 'testData_en.json');

    //Export data to CSV file
    exportToCSV(testData, 'testData_en.csv');
});


