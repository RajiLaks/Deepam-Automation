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
        this.SCoption = page.locator('div.card.type-of-consulation',{ hasText: 'Scheduled Consultation' })
        this.DashboardLink = this.page.locator('nav').getByRole('link', { name: 'Dashboard' })
        this.ConfirmYesButton = this.page.getByRole('button', { name: 'Yes' })
        this.SpecialtyDropdown = this.page.locator('select.search-doctor.custom-select').nth(0)
        this.GenderDropdown = this.page.locator('select.search-doctor.custom-select').nth(1)
        this.dateInput = this.page.getByPlaceholder('DD/MM/YYYY')
        this.timeInput = page.getByPlaceholder("Select time")
        this.searchButton = this.page.getByRole('button', { name: 'Search' })
        this.DoctorviewButton = this.page.getByRole('button', { name: 'View' })
        this.CreateScheduleclose = this.page.getByRole('button', { name: 'Close' })
        this.ScheduletimeDropdown = this.page.locator('select.custom-select:not(.search-doctor)')
        this.ScheduleAppointmentBtn = this.page.getByRole('button', {name: 'Schedule Appointment'})
        this.nextButton = page.getByRole('button', { name: 'Next' })
 
 
       
    }
 
    async verifyDashboardPage() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.page.locator('#dashboard p.heading')).toBeVisible();
    }
   
    async ScrollDashboard()
    {
    for (let i = 0; i < 50; i++) {
    await this.page.mouse.wheel(0, 80);
    await this.page.waitForTimeout(180);
    }
    await this.page.waitForTimeout(150);
    for (let i = 0; i < 50; i++) {
    await this.page.mouse.wheel(0, -80);
    await this.page.waitForTimeout(180);
    }
    }
 
    async SCOpen()
    {
    await this.SCoption.waitFor({ state: 'visible' });
    await this.SCoption.click();
    await this.page.waitForTimeout(2000);
    }
 
    async DashboardClick()
    {
        await this.DashboardLink.waitFor({ state: 'visible' });
        await this.DashboardLink.click()
        await this.page.waitForTimeout(2000)
    }
 
    async DashboardConfirmYes()
    {
        await this.ConfirmYesButton.click()
        await this.page.waitForTimeout(2000)
    }
 
    async AvailabilityFill({ Specialty, Gender, Date, Time })
    {
        for (let i = 0; i < 50; i++) {
        await this.page.mouse.wheel(0, 80)
        }
        await this.SpecialtyDropdown.selectOption({ label: Specialty })
        await this.page.waitForTimeout(1500)
        await this.GenderDropdown.selectOption({ label: Gender})
        await this.page.waitForTimeout(1500)
        await this.dateInput.click()
        await this.selectDate(Date)
        await this.page.waitForTimeout(1500)
        await this.timeInput.click()
        await this.selectTime(Time)
        await this.page.waitForTimeout(1500)
    }
 
    async selectDate(date)
    {
    const [day] = date.split('/')
    const targetDay = String(Number(day))
 
    const dayCell = this.page.locator(`//td[contains(@class,'available')]//span[normalize-space()='${targetDay}']`)
    await dayCell.waitFor({ state: 'visible' })
    await dayCell.click()
    }
 
    async selectTime(Time)
    {
    const timeOption = this.page.locator(`//div[contains(@class,'time-select-item') and normalize-space()='${Time}']`)
 
    await timeOption.waitFor({ state: 'visible' });
    await timeOption.click()
    }
 
    async SearchClick()
    {
        await this.searchButton.waitFor({state: 'visible'})
        await this.searchButton.click()
        await this.page.waitForTimeout(3000)
        for (let i = 0; i < 50; i++) {
        await this.page.mouse.wheel(0, 80)
        }
        await this.page.waitForTimeout(3000)
    }
 
    async clickView()
    {
        await this.DoctorviewButton.waitFor({ state: 'visible' })
        await this.DoctorviewButton.click()
        await this.page.waitForTimeout(3000)
    }
 
    async CreateScheduleBoxClose()
    {
        await this.CreateScheduleclose.click()
        await this.page.waitForTimeout(2000)
    }
 
 
    async ScheduleTime({ Schedule })
    {
        await this.ScheduletimeDropdown.waitFor({ state: 'visible' })
        await this.ScheduletimeDropdown.selectOption({value: Schedule,})
    }
 
 
    async ScheduleAppointment()
    {
        await this.ScheduleAppointmentBtn.waitFor({state: 'visible'})
        await this.ScheduleAppointmentBtn.click()
        await this.page.waitForTimeout(3000)
    }
 
  async clickNext()
    {
        for (let i = 0; i < 40; i++) {
            await this.page.mouse.wheel(0, 60)
            await this.page.waitForTimeout(100)
        }
        await this.nextButton.click()
        await this.page.waitForTimeout(2000)
    }  
 
 
}
 
module.exports = {DashboardPage};