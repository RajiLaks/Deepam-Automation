exports.Profile = class Profile {
    constructor(page) {
        this.page = page;

        this.Editbutton = page.locator("//button[@title='Click here, to edit the form']")

        this.firstName = page.locator("#firstnames");
        this.lastName = page.locator("#lastname");
        this.genderName = page.locator("//label[contains(normalize-space(),'Gender')]/../div/select");
        //DOB
        this.datepicker = page.locator("#dateOfBirth");
        this.currentDate = page.locator("//td[@class='available today']/div");

        this.selectLanguage = page.locator("#language");   //Language

        this.clickMobileNo = page.locator("#phonenumber");    //MObileNumber

        this.clickEmail = page.locator("#email"); //E-mail

        this.clickMaritalStatus = page.locator("#maritalstatus");  //Marital Status
        this.scrollToMarital = page.locator("//label[text()='ID Proof']") // scroll to Marital Status

        this.clickEmergencyNumber = page.locator("//label[contains(normalize-space(),'Emergency Contact')]/../following-sibling::div/input");  //Emergency Number
        this.blood_G = page.locator("//label[normalize-space()='Blood Group']/../following-sibling::div/select");  //Blood-Group

        this.clickAddress = page.locator("#address");  //Address

        this.clickEmiratesId = page.locator("#emiratesId");  //Emirates Id

        this.clickEmirates = page.locator("#emirateValue");  //Emirates

        this.clickTrnNo = page.locator("#trnNo") //TrnNo

        // upload photos
        //this.customer_profilepicture = page.locator("//div[@class='dz-default dz-message']").nth(0);  
        //Click the upload icon
        this.uploadPhotoTrigger = page.locator("//div[@class='dz-default dz-message']/span[text()='UPLOAD PHOTO']");

        // clicks the Id Proof
        this.uploadIdProof = page.locator("//div[@class='col-sm-12 col-md-12 col-lg-6']//div[@class='label-content']//div[@class='py-0 pl-0 col']//div//div[@class='row m-0']//i[@class='fa fa-cloud-upload']");

        // Clicks the OtherDocuments
        this.uploadOtherDocuments = page.locator("//div[@class='col-sm-12 col-md-8 col-lg-6']//div[@class='label-content']//div[@class='py-0 pl-0 col']//div//div[@class='row m-0']//div[@id='dropzone']");

        //OTP
        this.otp = page.locator("input[name='otp']");
        this.re_otp = page.locator("//a[(text()='Resend OTP??' or text()='Resend OTP in ')]")


        //Confim message 
        this.cancelbutton = page.locator(`//button[@class='btn cancel-btn-size secondary-btn mr-3 btn-secondary']`)
        //Submit

        this.conNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.conYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.closeIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");

        this.toastMessage = page.locator("//p[text()='User details created successfully']") //toast message
        //Notification

    }

    async Profileclick() {

        //Menu-Profile
        const downprofile = this.page.locator("//li[@role='presentation']//*[@data-icon='address-card']");
        const clickMenu = this.page.locator("//div[@class='nav-height']");


        const profile = this.page.locator("//a[@href='/user-profile']//div[@class='v-list-item__title font-weight-bold']");

        const isVisible = await profile.isVisible();

        if (isVisible) {
            await this.page.waitForTimeout(500);
            await profile.click();

            await this.Editbutton.waitFor({ state: 'visible', timeout: 5000 });

        } else {
            await clickMenu.click();
            await this.page.waitForTimeout(500);
            await downprofile.waitFor({ state: 'visible' });
            await downprofile.click();
            await this.page.waitForTimeout(500);
        }
    }

    async Edit() {
        await this.Editbutton.waitFor({ state: 'visible' });

        await this.Editbutton.click();
        await this.page.waitForTimeout(500);



    }

    //firstname
    async Firstname(firstname) {
        await this.firstName.waitFor({ state: 'visible' });
        await this.firstName.fill(" ");

        await this.firstName.fill(firstname);
        await this.page.waitForTimeout(500);

    }
    //Last name     
    async Lastname(Lastname) {
        await this.lastName.fill(" ");
        await this.lastName.fill(Lastname);
        await this.page.waitForTimeout(500);

    }
    // gender
    async Gender(Gender) {
        await this.genderName.waitFor({ state: 'visible' });

        await this.genderName.selectOption(Gender);
        await this.page.waitForTimeout(500);

    }
    //DOB
    async DateOfBirth() {
        await this.datepicker.click();
        await this.currentDate.click();
        await this.page.waitForTimeout(500);
    }

    //Language
    async Language(Language) {
        await this.selectLanguage.selectOption(Language);
        await this.page.waitForTimeout(500);
    }

    async Mobile(MobileNo) {
        await this.clickMobileNo.fill(MobileNo);
        await this.page.waitForTimeout(500);
    }
    async Email(Email) {
        await this.clickEmail.fill(Email);
        await this.page.waitForTimeout(500);
    }
    //Marital Status
    async MaritalStatus(Marital) {
        await this.clickMaritalStatus.waitFor({ state: 'visible' });
        await this.clickMaritalStatus.selectOption(Marital)
        await this.page.waitForTimeout(500);

    }
    async Emergency(EmergencyCon) {

        await this.clickEmergencyNumber.waitFor({ state: 'visible' });
        await this.clickEmergencyNumber.fill(EmergencyCon);
        await this.page.waitForTimeout(500);

    }
    async BloodGroup(BG) {
        await this.blood_G.waitFor({ state: 'visible' });
        await this.blood_G.selectOption(BG);
        await this.page.waitForTimeout(500);

    }

    async Address(Address) {
        await this.clickAddress.fill(Address);
        await this.page.waitForTimeout(500);

    }
    async EmirateID(EmiratesId) {
        await this.clickEmiratesId.fill(EmiratesId);
        await this.page.waitForTimeout(500);

    }
    async TRNno(TRNno) {
        await this.clickTrnNo.fill(TRNno)
        await this.page.waitForTimeout(500);

    }
    //Emirates
    async Emirate(Emirate) {
        await this.clickEmirates.selectOption(Emirate)
        await this.page.waitForTimeout(500);

    }

    //New method for photo upload
    async upload_ProfilePhoto(uploadPhotoPath) {

        await this.uploadPhotoTrigger.waitFor({ state: 'visible' })


        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),

            this.uploadPhotoTrigger.click(),  // Trigger the file chooser
        ]);

        await fileChooser.setFiles(uploadPhotoPath);  // Set the file to upload

        await this.page.waitForTimeout(500);


    }


    //New method for ID photo upload
    async upload_IdProof(IdProofPath) {
        await this.uploadIdProof.waitFor({ state: 'visible' });

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),

            await this.uploadIdProof.click(),  // Trigger the file chooser
        ]);

        await fileChooser.setFiles(IdProofPath);  // Set the file to upload
        const load = "//div[@class='col-sm-12 col-md-12 col-lg-6']//div[contains(@class,'mb-2')]//div[@class='row m-0']"

        await this.page.waitForSelector(load, { state: 'visible', timeout: 5000 });

        await this.page.waitForTimeout(2000);

    }


    //New method for Other Photo upload
    async upload_OtherDocuments(OtherDocumentsPath) {
        await this.uploadOtherDocuments.waitFor({ state: 'visible' });

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),

            await this.uploadOtherDocuments.click(),  // Trigger the file chooser
        ]);

        await fileChooser.setFiles(OtherDocumentsPath);  // Set the file to upload
        const load = "//div[@class='col-sm-12 col-md-8 col-lg-6']//div[@class='mb-2 ']"

        await this.page.waitForSelector(load, { state: 'visible', timeout: 5000 });
        await this.page.waitForTimeout(2000);


    }

    //submit
    async Submit() {
        await this.page.waitForTimeout(1000);

        const submit = await this.page.locator(`//button[@class='btn submit-btn-size primary-btn btn-secondary']`)
        const count = await submit.count();
        const index = count >= 2 ? 2 : 1;
        const submitbutton = await this.page.locator(`(//button[@class='btn submit-btn-size primary-btn btn-secondary'])[${index}]`)
        await submitbutton.waitFor({ state: 'visible' });
        await submitbutton.click();
        await this.page.waitForTimeout(500);

    }
    async Cancel() {
        await this.cancelbutton.click();
        await this.page.waitForTimeout(500);
    }

    async ConfirmYes() {
        await this.conYes.click();
        await this.page.waitForTimeout(2000);
    }
    async ConfirmNo() {
        await this.conNo.click();
        await this.page.waitForTimeout(1000);
    }
    async CloseIcon() {

        if (await this.closeIcon.isVisible()) {
            await this.closeIcon.waitFor({ state: 'visible', timeout: 5000 });
            await this.closeIcon.click();
        } else {
            await this.page.locator("//button[normalize-space()='×']")
        }
        await this.page.waitForTimeout(1000);
    }
    async OTP_Verify(userData) {
        await this.otp.waitFor({ state: 'visible', timeout: 5000 });
        //const userData = await this.page.evaluate(() => prompt("Enter some data:"));
        await this.otp.fill(userData);
        await this.page.waitForTimeout(1000);
    }
    async Resent_OTP() {
        await this.re_otp.waitFor({ state: 'visible', timeout: 5000 });
        await this.re_otp.click();

    }




}