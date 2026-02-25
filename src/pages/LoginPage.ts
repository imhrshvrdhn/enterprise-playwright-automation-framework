import {Page} from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtil";

export default class LoginPage{
private readonly usernameInputSelector = "#username";
private readonly passwordInputSelector = "#password";
private readonly loginButtonSelector = "#Login";
private page: Page;

constructor(page: Page){
    this.page = page;
 }

async navigateToLoginPage(){
    await this.page.goto("/");
    logger.info('Navigated to login.salesforce.com');
}

async fillUserName(userName: string){
   await this.page.locator(this.usernameInputSelector).fill(userName);  
   logger.info('Filled Username');  
}

async fillPassword(password: string){
    await this.page.locator(this.passwordInputSelector).fill(password);
    logger.info('Filled Password');
}

async clickLoginButton(){
    await this.page
    .locator(this.loginButtonSelector)
    .click()
    .catch((error)=>{
        logger.error(`Error clicking login button: ${error}`);
        throw error;
    }).then(()=>logger.info("Clicked login button"));
    const homePage = new HomePage(this.page);
    return homePage;
}
}