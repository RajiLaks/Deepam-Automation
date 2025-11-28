const {expect} = require ('@playwright/test');
class LoginPage{
    constructor(page){
        this.page = page;
        this.SignInDropdownButton = page.locator('//button[text()="Sign In"]');
        this.Doctor = page.locator('//a[text()="Doctor"]');
        this.HelpDesk = page.locator('//a[text()="Helpdesk"]');
        this.Pharmacist = page.locator('//a[text()="Pharmacist"]');
        this.LabAssistant = page.locator('//a[text()="Lab Assistant"]');
        this.Admin = page.locator('//a[text()="Admin"]');
        this.PharmacyAdmin = page.locator('//a[text()="Pharmacy Admin"]');
        this.mobileNo = page.locator('//input[@id="input-74"]');
        this.password = page.locator('//input[@name="password"]');
        this.SignInbutton = page.locator('//div[@class="login-button-box"]/button');
        this.eyeIcon = page.locator('//div[@class="password-icon"]');

    }
    async LaunchURL(URL){
        await this.page.goto(URL);
        await this.page.waitForTimeout(2000);
        await this.SignInDropdownButton.click();
    }

    async DoctorLogin(MobileNo, Password){
        await this.Doctor.click();
        await this.page.waitForTimeout(1000);
        await this.mobileNo.fill(MobileNo);
        await this.page.waitForTimeout(1000);
        await this.password.fill(Password);
        await this.page.waitForTimeout(1000);
        await this.eyeIcon.click();
        await this.page.waitForTimeout(1000);
        await this.SignInbutton.click();
        await this.page.waitForTimeout(1000);
    }

    async HelpDeskLogin(MobileNo, Password){
        await this.HelpDesk.click();
        await this.page.waitForTimeout(1000);
        await this.mobileNo.fill(MobileNo);
        await this.page.waitForTimeout(1000);
        await this.password.fill(Password);
        await this.page.waitForTimeout(1000);
        await this.eyeIcon.click();
        await this.page.waitForTimeout(1000);
        await this.SignInbutton.click();
        await this.page.waitForTimeout(1000);
    }

    async PharmacistLogin(MobileNo, Password){
        await this.Pharmacist.click();
        await this.page.waitForTimeout(1000);
        await this.mobileNo.fill(MobileNo);
        await this.page.waitForTimeout(1000);
        await this.password.fill(Password);
        await this.page.waitForTimeout(1000);
        await this.eyeIcon.click();
        await this.page.waitForTimeout(1000);
        await this.SignInbutton.click();
        await this.page.waitForTimeout(1000);
    }
    
    async LabAssistantLogin(MobileNo, Password){
        await this.LabAssistant.click();
        await this.page.waitForTimeout(1000);
        await this.mobileNo.fill(MobileNo);
        await this.page.waitForTimeout(1000);
        await this.password.fill(Password);
        await this.page.waitForTimeout(1000);
        await this.eyeIcon.click();
        await this.page.waitForTimeout(1000);
        await this.SignInbutton.click();
        await this.page.waitForTimeout(1000);
    }

    async AdminLogin(MobileNo, Password){
        await this.Admin.click();
        await this.page.waitForTimeout(1000);
        await this.mobileNo.fill(MobileNo);
        await this.page.waitForTimeout(1000);
        await this.password.fill(Password);
        await this.page.waitForTimeout(1000);
        await this.eyeIcon.click();
        await this.page.waitForTimeout(1000);
        await this.SignInbutton.click();
        await this.page.waitForTimeout(1000);
    }

    async PharmacyAdminLogin(MobileNo, Password){
        await this.PharmacyAdmin.click();
        await this.page.waitForTimeout(1000);
        await this.mobileNo.fill(MobileNo);
        await this.page.waitForTimeout(1000);
        await this.password.fill(Password);
        await this.page.waitForTimeout(1000);
        await this.eyeIcon.click();
        await this.page.waitForTimeout(1000);
        await this.SignInbutton.click();
        await this.page.waitForTimeout(1000);
    }


}

module.exports = {LoginPage};