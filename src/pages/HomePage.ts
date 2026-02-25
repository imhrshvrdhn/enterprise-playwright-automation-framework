import {Page, expect} from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class HomePage{
    private readonly serviceTitlelocator = "service";
    
    private page: Page;
    
    constructor(page: Page){
        this.page = page;
    }

    async expectServiceTitleToBeVisible(){
        await expect(this.page.getByTitle(this.serviceTitlelocator)).toBeVisible({
            timeout: 15000
        }).catch((error)=>{
            logger.error(`Error clicking login button: ${error}`);
            throw error; //rethrow the error if needed
        }).then(()=>logger.info("Service Title is visble"));
    }

    async navigateToContactTab(){
        await expect(this.page.getByRole('link', {name: this.contactsLinkLocator})).toBeVisible();
        logger.info("Contacts Tab is visble");
        await this.page.getByRole('link', {name: this.contactsLinkLocator}).click();
        logger.info("contacts tab is clicked");
        return new ContactPage(this.page);
    }
}