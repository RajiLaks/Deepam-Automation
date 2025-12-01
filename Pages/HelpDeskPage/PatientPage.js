const {expect} = require ('@playwright/test');

class PatientPage
{
    constructor(page)
    {
        this.page = page;
        this.patientDetailsLink = page.locator('a.nav-link[href="/patientshistory"]')
        this.addpatient = page.getByRole('button', { name: 'Add Patient' })
        this.APCancel = page.getByRole('button', { name: 'Cancel' })
        this.APcancelno = page.getByRole('button', { name: 'No' })
        this.APcancelyes = page.getByRole('button', { name: 'Yes' })
        this.APmandatoryfields = ["First Name", "Last Name","Gender", "Date of Birth", "Age", "Mobile Number"]
        this.APsubmit = page.getByRole('button', { name: 'Submit' })
        this.APfirstname = page.locator('#firstname')
        this.APlastname = page.locator('#lastname')
        this.APgender = page.locator('#gender')
        this.APdateofbirth = page.locator('#dob')
        this.APage = page.locator('#age')
        this.APmobilenumber = page.locator('#mobilenumber')
        this.APemail = page.locator('#email')
        this.APbloodgroup = page.locator("//label[contains(text(),'Blood Group')]/following::select[1]")
        this.APcompanyname = page.locator('#companyname')
        this.Searchfunction = page.getByPlaceholder('Search')
        this.Searchnorecord = page.locator("//div[contains(text(),'No record found')]")



        
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

    async APClose()
    {
        await this.APCancel.click();
        await this.page.waitForTimeout(2000);
    }

    async APCloseNo()
    {
        await this.APcancelno.click();
        await this.page.waitForTimeout(2000);
    }

    async APCloseYes()
    {
        await this.APcancelyes.click();
        await this.page.waitForTimeout(2000);
    }

    async APSubmit()
    {
        await this.APsubmit.click();
        await this.page.waitForTimeout(2000);
    }

    async VerifyMandatoryFields() 
    {
    for (const field of this.APmandatoryfields) {
        const fieldLocator = this.page.locator(
            `label.label-profile:has-text("${field}") >> span.required`
        );
        await expect(fieldLocator).toHaveText('*');
    }
    }

    async VerifyMandatoryErrorMessages() 
    {
    for (const field of this.APmandatoryfields) {
        const errorText = `${field} is required`;
        await expect(this.page.getByText(errorText)).toBeVisible();
    }
    }

    async selectDOB(dob)
     {
    const [day, month, year] = dob.split("/").map(x => parseInt(x));
    const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthLabel = monthNames[month]
    await this.APdateofbirth.click();

    await this.page.locator('.el-date-picker__header-label').first().click();

    // Locators for navigation buttons
    const prev = this.page.locator('button[aria-label="Previous Year"]');
    const next = this.page.locator('button[aria-label="Next Year"]');

    // Step 2: Navigate to correct decade
    while (true) {
        // Get current visible decade text (e.g. "2000 - 2009")
        const decadeText = await this.page.locator('.el-date-picker__header-label').first().innerText();
        const [start, end] = decadeText.split('-').map(x => parseInt(x.trim()));

        if (year >= start && year <= end) {
            break; // Year is within visible range
        }

        if (year < start) {
            await prev.click();   // Go backward
        } else {
            await next.click();   // Go forward
        }
        await this.page.waitForTimeout(1500);
    }

    // Select the year, month and date
    await this.page.locator(`//a[contains(@class,'cell')][text()="${year}"]`).click();
    await this.page.waitForTimeout(1500);
    await this.page.locator(`//a[contains(@class,'cell')][text()="${monthLabel}"]`).click();
    await this.page.waitForTimeout(1500);
    await this.page.locator(`//td[contains(@class,'available')]//span[normalize-space(text())="${day}"]`).click();
    }


    async AddPatient(data) 
    {

    if (data.firstName) await this.APfirstname.fill(data.firstName);
    await this.page.waitForTimeout(1500);
    if (data.lastName) await this.APlastname.fill(data.lastName);
    await this.page.waitForTimeout(1500);
    if (data.gender) await this.APgender.selectOption(data.gender);
    await this.page.waitForTimeout(1500);

    if (data.dob) {
        await this.selectDOB(data.dob);
        await expect(this.APage).not.toHaveValue('');   // Age must auto-fill
    }
    await this.page.waitForTimeout(1500);
    if (data.mobileNumber) await this.APmobilenumber.fill(data.mobileNumber);
    

    await this.page.waitForTimeout(1500);
    if (data.email) await this.APemail.fill(data.email);
    

    if (data.bloodGroup) {
    await this.APbloodgroup.waitFor({ state: "visible" });
    await this.page.waitForTimeout(1500);
    await this.APbloodgroup.selectOption({ label: data.bloodGroup });
    }

    await this.page.waitForTimeout(1500);
    if (data.companyName) await this.APcompanyname.fill(data.companyName);
    }

    async SearchPatient(searchText) 
    {
    await this.Searchfunction.click();
    await this.page.waitForTimeout(1000);

    await this.Searchfunction.fill(searchText);
    await this.page.waitForTimeout(1500);

    const row = this.page.locator(
        `.ag-row:has(.ag-cell:has-text("${searchText}"))`
    ).first();

    if (await row.count() > 0) {
        await row.click();
        return true;  // Valid search
    }

    if (await this.Searchnorecord.isVisible()) {
        return false;
    }

    return false;
    }





}
module.exports = {PatientPage};