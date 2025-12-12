const {expect} = require ('@playwright/test');

class DashboardPage
{
    constructor(page)
    {
        this.page = page;
        this.historyLink = this.page.locator('a[href="/helpdeskhistory"]').first()
        this.backButton = this.page.getByRole('button', { name: 'Back' })
        this.nextPageBtn = this.page.getByRole('button', { name: 'Next Page' })
        this.previousPageBtn = this.page.getByRole('button', { name: 'Previous Page' })
        this.viewButton = this.page.locator('div[col-id="action"] .view-btn').first()
        this.viewCloseBtn = page.getByRole('button', { name: 'Close' })


        
    }

    async verifyDashboardPage() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.page.locator('#dashboard p.heading')).toBeVisible();
    }
    
   async ScrollViewBox() 
   {
    const scrollBox = this.page.locator('div.from-field1.px-3');

    for (let i = 0; i < 10; i++) {
        await scrollBox.evaluate(el => el.scrollBy(0, 300));
        await this.page.waitForTimeout(200);  // scroll down
    }

    for (let i = 0; i < 10; i++) {
        await scrollBox.evaluate(el => el.scrollBy(0, -300));
        await this.page.waitForTimeout(200); //scroll up
    }
    }




}

module.exports = {DashboardPage};