const {expect} = require ('@playwright/test');
class WaitingFlow{
    constructor(page){
        this.page = page;
        this.ODC = page.locator('(//p[@class="icon-head"])[1]'); //ODC - OnDemand Consultation
        this.waitingText = page.locator('(//div[@class="text-center mt-2"])[2]/span');
        this.WaitingNoData = page.locator('(//div[@class="card-body text-center"])[2]/p');
        this.Scroll = page.locator('(//p[@class="profile-details mt-1"])[8]');
        this.viewButton = page.locator("//div[@class='row']//div[3]//div[1]//div[1]//div[1]//div[1]//div[1]//div[1]//div[1]//div[1]//div[3]//div[1]//button[1]");

        //Patient appointment- Doctor will accept
        this.backbutton = page.locator('(//div[@class="rectangle-view"])/button[1]');    
        this.ViewEHR = page.locator('(//div[@class="rectangle-view"])/button[2]');
        this.Reports = page.locator('//a[text()="Reports"]');
        this.MedicalHistory = page.locator('//a[text()="Medical History"]');
        this.SurgeryHistory = page.locator('//a[text()="Surgery History"]');
        this.FamilyHistory = page.locator('//a[text()="Family History"]');
        this.Allergies = page.locator('//a[text()="Allergies"]');
        this.Medications = page.locator('//a[text()="Medications"]');
        this.LifeStyle = page.locator('//a[text()="Life Style"]');
        this.closeEHR = page.locator('//div[@class="rectangle-view"]/button');
        this.AcceptButton = page.locator('//div[@class="row back-align margintext"]/div[2]');

        //Notes
        this.cheifComplaints = page.locator('(//label[@class="label-profile"])[3]');
        this.diagnosis = page.locator('//div[@id="infodiagnosis"]');
        this.notes = page.locator('(//div[@class="nav-item"])[3]/a[text()="NOTES"]');
        this.NotesText = page.locator('//a[text()="NOTES"]');
        this.Notes_BackButton = page.locator('//button[@class="btn secondary-btn back-btn-size btn-secondary"]');
        this.followUp = page.locator('//h4[text()="Follow Up"]');
        this.TreatmentPlan = page.locator('(//textarea[@class="form-control form-control"])[5]');
        this.symptoms = page.locator('(//textarea[@class="form-control form-control"])[1]');
        this.CheifComplaintField = page.locator('(//textarea[@class="form-control form-control"])[3]');
        this.Diagnosis = page.locator('(//textarea[@class="form-control form-control"])[4]');
        this.notes_continuebutton = page.locator('//div[@class="col-12 notes-button"]/button[2]');

        //RX
        this.RXText = page.locator('//a[text()="RX"]');
        this.BackButton = page.locator('//button[@class="btn mr-2 secondary-btn back-btn-size btn-secondary"]');
        this.SearchMedicine = page.locator('//input[@id="searchInput"]');
        this.selectDolo = page.locator('//div[@id="suggestions"]/ul/li[1]');
        this.dosage = page.locator('//input[@id="input-strength"]');
        this.Intake = page.locator('//select[@id="intakefood"]');
        this.IntakeOption = page.locator('//select[@id="intakefood"]/option[text()="Before food"]');
        this.medicinedaysCount = page.locator('//input[@id="medicinecount"]');
        this.morningMedicine = page.locator('//select[@id="medmorn"]');
        this.mornMedCount = page.locator('//select[@id="medmorn"]/option[3]');
        this.afternoonMedicine = page.locator('//select[@id="mednoon"]');
        this.afNoonMedCount = page.locator('//select[@id="mednoon"]/option[1]');
        this.nightMedicine = page.locator('//select[@id="mednight"]');
        this.nightMedCount = page.locator('//select[@id="mednight"]/option[3]');
        this.addButton = page.locator('//button[@id="add-btn"]');
        this.ContinueButton_RX = page.locator('//div[@class="rxcontinue pt-2"]/div[2]/button');

        //Lab
        this.Category = page.locator('//select[@class="custom-select"]');
        this.Investigation = page.locator('//div[@class="input-group"]/input');
        this.Option_Investigation = page.locator('//div[@id="labsuggestionscat"]/ul/li[1]');
        this.ContinueButton_Lab = page.locator('//div[@class="text-center mt-3"]/button[2]');

        //summary
        this.Advice = page.locator('(//div[@class="form-group"])[6]');
        this.complete = page.locator('//div[@class="text-center pt-3"]/button[2]'); 
        this.Confirm_YesButton = page.locator('//div[@class="el-message-box__btns"]/button[2]');
        this.FeedBack_SubmitButton = page.locator('//div[@class="btn_center col"]/button');
        this.BackToDashboardButton = page.locator('//div[@id="button-id"]/div/div[1]/div/button');
    }

    async ODC_Screen(){  
        await this.ODC.click();
        await this.page.waitForTimeout(1000);
    }

    async waitingScreen(){
        const WaitingCountText = await this.waitingText.innerText();
        const waiting_Count = parseInt(await WaitingCountText.trim(), 10);
        if(waiting_Count === 0){
            const NoPatient = await this.WaitingNoData.innerText();
            console.log(NoPatient);
        }
        else{
            await this.page.waitForTimeout(1000);
            await this.viewButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.viewButton.click();
            await this.page.waitForTimeout(1000);
            await this.backbutton.click();
            await this.page.waitForTimeout(1000);
            await this.viewButton.click();
            await this.page.waitForTimeout(1000);
            await this.ViewEHR.click();
            await this.page.waitForTimeout(1000);
            await this.Reports.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.MedicalHistory.click();
            await this.page.waitForTimeout(1000);
            await this.SurgeryHistory.click();
            await this.page.waitForTimeout(1000);
            await this.FamilyHistory.click();
            await this.page.waitForTimeout(1000);
            await this.Allergies.click();
            await this.page.waitForTimeout(1000);
            await this.Medications.click();
            await this.page.waitForTimeout(1000);
            await this.LifeStyle.click();
            await this.page.waitForTimeout(1000);
            await this.Reports.click();
            await this.page.waitForTimeout(1000);
            await this.closeEHR.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.closeEHR.click();
            await this.AcceptButton.click();
            await this.page.waitForTimeout(1000);
            /*await this.diagnosis.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.followUp.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.Notes_BackButton.click();*/
        }
    }

    async NotesScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan){
        //const notetab = await this.notes.innerText();
        expect(this.notes).toHaveText("NOTES");
        await this.page.waitForTimeout(1000);
        //await this.symptoms.clear();
        await this.symptoms.fill(Symptoms);
        await this.page.waitForTimeout(1000);
        await this.CheifComplaintField.clear();
        await this.CheifComplaintField.fill(Cheif_Complaint);
        await this.page.waitForTimeout(1000);
        await this.TreatmentPlan.scrollIntoViewIfNeeded();
        await this.Diagnosis.fill(Diagnosis_data);
        await this.page.waitForTimeout(1000);
        await this.TreatmentPlan.fill(treatment_plan);
        await this.followUp.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.notes_continuebutton.click();
        await this.page.waitForTimeout(1000);
    }

    async RX_Flow(medicine, Dosage, M_Count){
        await this.SearchMedicine.click();
        await this.page.waitForTimeout(1000);
        await this.SearchMedicine.fill(medicine); 
        await this.selectDolo.click();
        await this.page.waitForTimeout(1000);
        await this.dosage.fill(Dosage);
        await this.Intake.click();
        await this.Intake.selectOption({value : "BF"});
        await this.medicinedaysCount.fill(M_Count);
        await this.morningMedicine.click();
        await this.morningMedicine.selectOption({value : "2"});
        await this.afternoonMedicine.click();
        await this.afternoonMedicine.selectOption({value : "1"});
        await this.nightMedicine.click();
        await this.nightMedicine.selectOption({value : "3"});
        await this.addButton.click();
        await this.ContinueButton_RX.scrollIntoViewIfNeeded();
        await this.ContinueButton_RX.click();
        await this.page.waitForTimeout(2000);
    }

    async LabFlow(){
        await this.Category.click();
        await this.page.waitForTimeout(500);
        await this.Category.selectOption({value : "Radiological"});
        await this.page.waitForTimeout(500);
        await this.Investigation.fill("Blood");
        await this.page.waitForTimeout(500);
        await this.Option_Investigation.click();
        await this.page.waitForTimeout(500);
        await this.addButton.click();
        await this.page.waitForTimeout(500);
        await this.ContinueButton_Lab.click();
        await this.page.pause();

    }

    async SummaryFlow(){
        await this.Advice.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.complete.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.complete.click();
        await this.page.waitForTimeout(1000);
        await this.Confirm_YesButton.click();
        await this.page.waitForTimeout(1000);
        await this.FeedBack_SubmitButton.click();
        await this.page.waitForTimeout(1000);
        await this.BackToDashboardButton.click();
        await this.page.waitForTimeout(1000);
        await this.page.pause();
    }

}
module.exports = {WaitingFlow};