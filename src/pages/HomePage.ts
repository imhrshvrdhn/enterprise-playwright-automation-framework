import {Page, expect} from "@playwright/test";

export default class HomePage{
    private readonly serviceTitlelocator = "service";

    constructor(private page: Page){

    }

    async expectServiceTitleToBeVisible(){
        await expect(this.page.getByTitle(this.serviceTitlelocator)).toBeVisible({timeout: 15000});
    }
}