const {expect} = require ('@playwright/test');

class PatientPage
{
    constructor(page)
    {
        this.page = page;
        this.patientDetailsLink = page.locator('a.nav-link[href="/patientshistory"]')
        this.addpatient = page.getByRole('button', { name: 'Add Patient' })
        
    }

    async PDClick()
    {
        await this.patientDetailsLink.click();
        await this.page.waitForTimeout(2000);
    }

    async APClick()
    {
        await this.addpatient.click();
        await this.page.waitForTimeout(2000);
    }

    

}
module.exports = {PatientPage};