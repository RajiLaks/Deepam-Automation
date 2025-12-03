const {expect} = require ('@playwright/test');

class OnDemandConsultation{
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

        //Ongoing
        this.ongoingButton = page.locator('(//div[@class="card type-card"])[1]');
        this.countForOngoing = page.locator('(//div[@class="text-center mt-2"])[1]/span');
        this.continueButton = page.locator('(//button[@class="btn primary-btn continue-btn-size btn-secondary"])[1]');
        this.OngoingNoData = page.locator('(//div[@class="card-body text-center"])[1]/p');
        

        //Notes
        //this.cheifComplaints = page.locator('(//textarea[@class="form-control form-control"])[3]');
        this.diagnosis = page.locator('//div[@id="infodiagnosis"]');
        this.notes = page.locator('(//div[@class="nav-item"])[3]');
        this.NotesText = page.locator('//a[text()="NOTES"]');
        this.Notes_BackButton = page.locator('//button[@class="btn secondary-btn back-btn-size btn-secondary"]');
        this.followUp = page.locator('//h4[text()="Follow Up"]');
        //this.TreatmentPlan = page.locator('(//textarea[@class="form-control form-control"])[5]');

        //RX
        this.RXText = page.locator('//a[text()="RX"]');
        this.BackButton = page.locator('//button[@class="btn mr-2 secondary-btn back-btn-size btn-secondary"]');

        //Vitals
        this.vitalsButton = page.locator('(//div[@class="row emraccordionrow"])[1]/a[@role="button"]');
        this.EditButton_Vitals = page.locator('//div[@class="edit-flex"]/div[2]/button');
        this.BloodPressure_Systolic = page.locator('(//input[@type="number"])[1]');
        this.BloodPressure_Diastolic = page.locator('(//input[@type="number"])[2]');
        this.Height = page.locator('(//div[@class="val-select"])[1]/input');
        this.Weight = page.locator('(//div[@class="val-select"])[2]/input');
        this.Temperature = page.locator('(//div[@class="val-select"])[3]/input');
        this.PulseRate = page.locator('(//input[@type="number"])[3]');
        this.SpO2_Level = page.locator('(//input[@type="number"])[4]');
        this.WaistCircumference = page.locator('(//div[@role="radiogroup"])[1]/div/label/span[text()="Yes"]');
        this.Triglycerides = page.locator('(//div[@role="radiogroup"])[2]/div/label/span[text()="Yes"]');
        this.FastingBloodGlucose = page.locator('(//div[@role="radiogroup"])[3]/div/label/span[text()="Yes"]');
        this.SubmitButton = page.locator('(//div[@class="text_align"])[1]/button[2]');
        this.VitalsToastMsg = page.locator('//p[text()="Vitals added successfully."]');

        //Medical History
        this.MedicalHistoryButton = page.locator('(//div[@class="row emraccordionrow"])[2]/a[@role="button"]');
        this.EditButton_MH = page.locator('(//div[@class="text-end"])[1]/button');
        this.IrregularHeartBeat = page.locator('//label[text()="Irregular heart beat problem"]');
        this.Asthma = page.locator('//label[text()="Asthma"]');
        this.Hepatitis = page.locator('//label[text()="Hepatitis A"]');
        this.KidneyStones = page.locator('//label[text()="Kidney stones"]');
        this.diabetes = page.locator('(//div[@class="col-sm-6 col-12"])[10]');
        this.Constipation = page.locator('//label[text()="Constipation"]');
        this.BrainStoke = page.locator('(//div[@role="radiogroup"])[4]/div/label/span[text()="Yes"]');
        this.Hypertension = page.locator('(//div[@role="radiogroup"])[5]/div/label/span[text()="Yes"]');
        this.Diabetes = page.locator('(//div[@role="radiogroup"])[6]/div/label/span[text()="Yes"]');
        this.DiabetesDetails = page.locator('(//input[@class="profile-input  form-control"])[5]');
        this.SubclinicalHypothyroidism = page.locator('(//input[@class="profile-input  form-control"])[6]');
    }   

    async ODC_Screen(){
        await this.ODC.click();
        await this.page.waitForTimeout(1000);
    }

    async Waiting(){
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
            await this.diagnosis.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.followUp.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.Notes_BackButton.click();
            //await this.Vitals();
        }
    }

    async OngoingScreen(){
        await this.ongoingButton.click();
        await this.continueButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.continueButton.click();
        await this.page.waitForTimeout(1000);
        const rx_text = await this.RXText.innerText();
        const notes_text = await this.NotesText.innerText();
        if (rx_text === "RX"){
            await this.BackButton.scrollIntoViewIfNeeded();
            await this.BackButton.click();
            await this.diagnosis.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.followUp.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.Notes_BackButton.click();
        }
        else if(notes_text === "NOTES"){
            await this.diagnosis.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.followUp.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.Notes_BackButton.click();
        }
        else{
            console.log("RajiR");
        }
    }

    async Vitals(Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level){
        await this.vitalsButton.click();
        await this.page.waitForTimeout(500);
        await this.EditButton_Vitals.click();
        await this.page.waitForTimeout(500);
        await this.BloodPressure_Systolic.fill(Systolic);
        await this.BloodPressure_Diastolic.fill(Diastolic);
        await this.Height.fill(height);
        await this.Weight.fill(weight);
        await this.Temperature.fill(Temp);
        await this.PulseRate.fill(pulseRate);
        await this.WaistCircumference.click();
        await this.Triglycerides.click();
        await this.FastingBloodGlucose.click();
        await this.SpO2_Level.fill(SpO2Level);
        await this.page.waitForTimeout(1000);
        await this.SubmitButton.click();
        await this.page.waitForTimeout(3000);
        //const toastMSG = await this.VitalsToastMsg.innerText();
        await expect(this.VitalsToastMsg).toHaveText('Vitals added successfully.');
        
    }

    async MedicalHistoryDropDown(diabeteseDetails){
        this.MedicalHistoryButton.click();
        this.EditButton_MH.click();
        await this.page.waitForTimeout(1000);
        await this.IrregularHeartBeat.click();
        await this.page.waitForTimeout(500);
        await this.Asthma.click();
        await this.page.waitForTimeout(500);
        await this.Hepatitis.click();
        await this.KidneyStones.click();
        //await this.diabetes.scrollIntoViewIfNeeded();
        await this.Constipation.click();
        await this.DiabetesDetails.fill(diabeteseDetails);
        await this.SubclinicalHypothyroidism.fill();
        await this.page.pause();
    }

/*
    async NotesScreen(){
        const notetab = await this.notes.innerText();
        expect(notetab).toContainText("Notes");
        await this.cheifComplaints.scrollIntoViewIfNeeded();
    }
    
    async Ongoing(){
        await this.ongoingButton.click();
        const Ongoing_Count = await this.countForOngoing.innerText();
        const CountOngoing = parseInt(await Ongoing_Count.trim(), 10);
        if(CountOngoing === 0){
            const NoAppointment = await this.OngoingNoData.innerText();
            console.log(NoAppointment);
        }
        else{
            await this.continueButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.continueButton.click();
            await this.page.pause();
        }
    }
        */
}
module.exports = {OnDemandConsultation};