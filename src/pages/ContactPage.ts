import {Page, expect} from "@playwright/test";
import logger from "../utils/LoggerUtil";
import { error } from "console";

export default class ContactPage{
    private readonly contactLink = "Contacts";
    private readonly newButtonLocator = "new";
    private readonly firstNameTextFieldLocator = "First Name";
    private readonly lastNameTextFieldLocator = "Last Name";
    private readonly saveButtonLocator = "Save";
    private readonly contactFullNameLabelLocator = "sfa-output-name-with-hierarchy-icon-wrapper";

    private page: Page;
    
    constructor(page: Page){
        this.page = page;
    }

    async createNewContact(fname: string, lname: string){
        await this.page.getByRole('button', {name: this.newButtonLocator}).click();
        logger.info("New Button is clicked");
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).fill(fname);
        logger.info(`First name is filled as ${fname}`);
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).fill(lname);
        logger.info(`Last name is filled as ${lname}`);
        await this.page.getByRole('button', {name: this.saveButtonLocator, exact: true}).click().catch((error)=>{
        logger.error(`Error clicking save button: ${error}`);
        throw error;
    }).then(()=> logger.info("Save button is clicked"));
    }

    async expectContactLabelContainsFirstNameAndLastName(fname: string, lname: string){
        await expect(this.page.locator(this.contactFullNameLabelLocator)).toContainText(`${fname} ${lname}`);
        logger.info(`New contact created and ${fname} ${lname} is visible`)
        await this.page.getByRole('link', {name: this.contactLink}).click();

    }
}