const {expect} = require ('@playwright/test');
 
class HistoryPage
{
    constructor(page)
    {
        this.page = page;
        this.historyLink = this.page.locator('a[href="/helpdeskhistory"]').first()
        this.backButton = this.page.getByRole('button', { name: 'Back' })
        this.nextPageBtn = this.page.getByRole('button', { name: 'Next Page' })
        this.previousPageBtn = this.page.getByRole('button', { name: 'Previous Page' })
 
       
    }
 
    async HistoryClick()
    {
        await this.historyLink.click();
        await this.page.waitForTimeout(3000);
    }
 
    async verifyHistoryPage() {
    await expect(this.page).toHaveURL(/helpdeskhistory/);
    await expect(this.page.getByRole('heading', { name: 'History' })).toBeVisible();
    }
 
    async verifyDashboardPage() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.page.locator('#dashboard p.heading')).toBeVisible();
    }
 
    async BackNavigation()
    {
        await this.backButton.click();
        await this.page.waitForTimeout(3000);
    }
 
    async Nextpage()
    {    
        await this.nextPageBtn.click()
        await this.page.waitForTimeout(3000)
    }
 
    async Previouspage()
    {    
        await this.previousPageBtn.click()
        await this.page.waitForTimeout(2000)
    }  
   
 
}
 
module.exports = {HistoryPage};