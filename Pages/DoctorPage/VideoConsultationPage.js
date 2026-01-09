const {expect} = require('@playwright/test');

class VideoConsultationPage {
    constructor(page) {
        this.page = page;
        this.ScheduleConsultation = page.locator('(//p[@class="icon-head"])[1]');

        //Edit Screen
        this.dateField = page.locator('//input[@placeholder="Select Date"]');
        this.AvailableToday = page.locator("(//td[@class='available today'])[1]");
        this.availableDoctor = page.locator("//select[@class='custom-select']");
        this.selectDoctor = page.locator("//select[@class='custom-select']/option[2]");
        this.selectTime = page.locator('(//form[@class="form-inline"])[2]/select');
        this.changeAppointment = page.locator('//div[@id="scheduleslot___BV_modal_body_"]/div/div/div[2]/div/div/button[2]');
        this.closeIcon = page.locator('//header[@class="modal-header"]/button');
        this.joinButton = page.locator('(//div[@id="doctordashboard"])[1]/div/div/div[2]/div/button[1]')

        //Video Consultation - Waiting Screen
        this.waitingButton = page.locator('//div[@class="card type-card"]/div/p[text()="Waiting"]');
        this.waitingText = page.locator('(//div[@class="text-center mt-2"])[2]/span');
        this.WaitingNoData = page.locator('(//div[@class="card-body text-center"])/p[@class="patient-waiting-fontsize"]');
        this.Scroll = page.locator('(//p[@class="profile-details mt-1"])[8]');
        this.editbutton_waiting = page.locator('(//div[@id="doctordashboard"])[1]/div/div/div[2]/div/button[2]');
        this.audioButton = page.locator('//button[@id="audio-off"]');
        this.videoButtonOff = page.locator('//button[@title="Video Off"]');
        this.videoButtonOn = page.locator('//button[@class="secondary-btn-icon"]');
        this.joinCallbutton = page.locator('//button[@id="button-join1"]');

        //EHR Screen
        this.EHRTab = page.locator("//div[@class='nav-item']/a[text()='EHR']");
        //Vitals Dropdown
        this.VitalsButton = page.locator("[aria-controls='accordion1']");
        this.Vitals_EditButton = page.locator("//div[@class='edit-flex']/div/button");
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

        //Medical History dropdown
        this.MedicalHistoryButton = page.locator('[aria-controls="accordion2"]');
        this.MH_EditButton = page.locator('//div[@id="patient-medicalhistory"]/div/div/div/button[@class="btn primary-btn edit-btn-size btn-secondary"]');
        //Heart Disease Options
        this.Stentsinheart = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Stents in heart']");
        this.Heartmurmurs = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Heart murmurs']");
        this.Irregularheartbeatproblem = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Irregular heart beat problem']");
        this.Hospitalizedforheartattack = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Hospitalized for heart attack']");
        this.HeartDisease_Others = page.locator("(//label[text()='Others'])[1]");
        this.OthersText1 = page.locator("(//div[@class='col-12 pt-2 p-0 pl-1 otherstextfield']/input[@class='otherText form-control'])[1]");
        //Respiratory Problems Options
        this.COPD = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='COPD']");
        this.Asthma = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Asthma']");
        this.Sinusallergies = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Sinus allergies']");
        this.Homeoxygenuse = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Home oxygen use']");
        this.Sleepapnea = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Sleep apnea']");
        this.Respiratory_Others = page.locator("(//label[text()='Others'])[2]");
        this.OthersText2 = page.locator("(//div[@class='col-12 pt-2 p-0 pl-1 otherstextfield']/input[@class='otherText form-control'])[2]");
        //Liver Disease
        this.HepatitisA = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Hepatitis A']");
        this.HepatitisB = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Hepatitis B']");
        this.HepatitisC = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Hepatitis C']");
        this.LiverFailure = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Liver failure']");
        this.Livertransplant = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Liver transplant']");
        this.LiverDisease_Others = page.locator("(//label[text()='Others'])[3]");
        this.LiverDisease_OthersText = page.locator("(//div[@class='col-12 pt-2 p-0 pl-1 otherstextfield']/input[@class='otherText form-control'])[3]");
        //Kidney Disease
        this.Dialysis = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Dialysis']");
        this.Kidneystones = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Kidney stones']");
        this.KidneyDisease_Others = page.locator("(//label[text()='Others'])[4]");
        this.KidneyOthersText = page.locator("(//div[@class='col-12 pt-2 p-0 pl-1 otherstextfield']/input[@class='otherText form-control'])[4]");
        //Gastrointestinal Problems
        this.Bleedinginstool = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Bleeding in stool']");
        this.Bloodvomiting = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Blood vomiting']");
        this.Chronicdiarrhea = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Chronic diarrhea']");
        this.Constipation = page.locator("//div[@class='problemCheck custom-control custom-control-inline custom-checkbox']/label[text()='Constipation']");
        this.Gastrointestinal_Others = page.locator("(//label[text()='Others'])[5]");
        this.Gastrointestinal_OthersText = page.locator("(//div[@class='col-12 pt-2 p-0 pl-1 otherstextfield']/input[@class='otherText form-control'])[5]");
        //Brain stroke
        this.BrainStroke_Yes = page.locator("(//div[@role='radiogroup'])[4]/div/label/span[text()='Yes']");
        this.BrainStroke_No = page.locator("(//div[@role='radiogroup'])[4]/div/label/span[text()='No']");
        //Hypertension
        this.Hypertension_Yes = page.locator("(//div[@role='radiogroup'])[5]/div/label/span[text()='Yes']");
        this.Hypertension_No = page.locator("(//div[@role='radiogroup'])[5]/div/label/span[text()='No']");
        //Diabetes
        this.Diabetes_Yes = page.locator("(//div[@role='radiogroup'])[6]/div/label/span[text()='Yes']");
        this.Diabetes_No = page.locator("(//div[@role='radiogroup'])[6]/div/label/span[text()='No']");
        //Any Cancer
        this.AnyCancer_Yes = page.locator("(//div[@role='radiogroup'])[7]/div/label/span[text()='Yes']");
        this.AnyCancer_No = page.locator("(//div[@role='radiogroup'])[7]/div/label/span[text()='No']");
        //Other Medical History Details
        this.DiabetesDetails = page.locator('(//input[@class="profile-input  form-control"])[5]');
        this.SubclinicalHypothyroidism = page.locator('(//input[@class="profile-input  form-control"])[6]');
        this.asthmaTextField = page.locator('(//input[@class="profile-input  form-control"])[7]');
        this.MH_SubmitButton = page.locator('(//div[@align="end"])[1]/button[2]');
        this.scrollForMH = page.locator('(//div[@class="col"]/div[@align="end"])[1]');
        this.toast_MH = page.locator('//p[text()="Medical History updated successfully."]');

        //Surgery History
        this.SurgeryHistoryButton = page.locator("[aria-controls='accordion3']");
        this.Surgery_EditButton = page.locator('//div[@id="accordion3"]/div/div/div/div/div/div/button');
        this.Tonsilsremoval = page.locator("//label[text()='Tonsils removal']");
        this.ThyroidSurgery = page.locator("//label[text()='Thyroid surgery']");
        this.Heartsurgery = page.locator("//label[text()='Heart surgery']");
        this.Gallbladderremoval = page.locator("//label[text()='Gall bladder removal']");
        this.Appendixsurgery = page.locator("//label[text()='Appendix surgery']");
        this.KneeHipReplacement = page.locator("//label[text()='Knee/hip replacement']");
        this.SurgeryHistory_Others = page.locator("(//label[text()='Others'])[6]");
        this.SurgeryHistory_OthersText = page.locator("(//div[@class='col-12 pt-2 p-0 pl-1 otherstextfield']/input[@class='otherText form-control'])[6]");
        this.SH_SubmitButton = page.locator('(//div[@align="end"])[2]/button[2]');
        this.toast_SH = page.locator('//p[text()="Surgical History updated successfully."]');



        //Family History
        this.FamilyHistoryButton = page.locator("[aria-controls='accordion4']");
        this.FamilyHistory_EditButton = page.locator('//div[@id="patient-familyhistory"]/div/div/div/div/button[@class="btn primary-btn edit-btn-size btn-secondary"]');
        this.Bleedingdisorder = page.locator("//label[text()='Bleeding disorder']");
        this.Stroke = page.locator("//label[text()='Stroke']");
        this.Cancer = page.locator("//label[text()='Cancer']");
        this.Diabetes = page.locator("//label[text()='Diabetes']");
        this.Heartdisease = page.locator("//label[text()='Heart disease']");
        this.FamilyHistory_Others = page.locator("(//label[text()='Others'])[7]");
        this.FamilyHistory_OthersText = page.locator("(//div[@class='col-12 pt-2 p-0 pl-1 otherstextfield']/input[@class='otherText form-control'])[6]");
        this.FH_SubmitButton = page.locator('(//div[@align="end"])[3]/button[2]');
        this.FH_Toast = page.locator('//p[text()="Family History updated successfully."]');

        //Allergies
        this.AllergiesButton = page.locator("[aria-controls='accordion5']");
        //OnExamination
        this.OnExaminationButton = page.locator("[aria-controls='accordion6']");
        //Medications
        this.MedicationsButton = page.locator("[aria-controls='accordion7']");
        //Life Style
        this.LifeStyleButton = page.locator("[aria-controls='accordion8']");
        //Appointment History
        this.AppointmentHistoryButton = page.locator("[aria-controls='accordion9']");
        //Reports
        this.ReportsButton = page.locator("[aria-controls='accordion10']");

        //Ongoing Appointments
        this.ongoingbutton = page.locator('(//div[@class="text-center mt-2"])/p[text()="Ongoing"]');
        this.ongoingText = page.locator('(//div[@class="text-center mt-2"])[1]/span');
        this.continueButton = page.locator('(//button[@class="btn primary-btn continue-btn-size btn-secondary"])[1]');
        this.OngoingNoData = page.locator('//div[@class="card-body text-center"]/p[@class="patient-waiting-fontsize"]');

    }

    async click_ScheduleConsultation() {
        await this.page.waitForTimeout(1000);
        await this.ScheduleConsultation.click();
    }

    async verify_WaitingAppointments() {
        await this.page.waitForTimeout(3000);
        const WaitingCountText = await this.waitingText.innerText();
        const waiting_Count = parseInt(await WaitingCountText.trim(), 10);
        if(waiting_Count === 0){
            const NoPatient = await this.WaitingNoData.innerText();
            console.log(NoPatient);
        }
        else{
            await this.page.waitForTimeout(1000);
            await this.clickEditButton_Waiting();
        }
    }

    async clickEditButton_Waiting(){
        await this.editbutton_waiting.scrollIntoViewIfNeeded();
        await this.editbutton_waiting.click();
        await this.page.waitForTimeout(1000);
    }
    
    async close_EditPage(){
        await this.closeIcon.click();
    }

    async join_WaitingCall(){
        await this.editbutton_waiting.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.joinButton.click();
   }

   async Mute_Unmute(){
        await this.audioButton.click();
        await this.page.waitForTimeout(1000);
        await this.audioButton.click();
   }

   async VideoOff_On(){
        await this.videoButtonOff.click();
        await this.page.waitForTimeout(500);   
        await this.videoButtonOn.click({force:true});   
   }

   async joincall(){
        await this.joinCallbutton.click();
        //await this.page.waitForTimeout(2000);
   }

   async click_EHR_screen(){
        await this.EHRTab.click();
   }

   async click_Vitals(){
        await this.VitalsButton.click();
        await this.page.waitForTimeout(1000);
   }

   async EditVitals(Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level){
        await this.Vitals_EditButton.click();
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
        await this.page.waitForTimeout(1000);
        await expect(this.VitalsToastMsg).toHaveText('Vitals added successfully.');
        await this.page.waitForTimeout(1000);
        await this.VitalsButton.click();
   }

   async click_MedicalHistory(){
        await this.MedicalHistoryButton.click();
   }

   async EditMedicalHistory_selectOptions(diabeteseDetails, Subclinical_Hypothyroidism, asthma){
        await this.MH_EditButton.click();
        //await this.page.waitForTimeout(1000);
        //Heart Disease
        await this.Stentsinheart.click();
        await this.Heartmurmurs.click();
        await this.Irregularheartbeatproblem.click();
        await this.Hospitalizedforheartattack.click();
        await this.HeartDisease_Others.click();
        await this.OthersText1.fill('Test');
        await this.page.waitForTimeout(1000);
        //Respiratory Problems
        await this.COPD.click();
        await this.Asthma.click();
        //await this.page.waitForTimeout(500);
        await this.Sinusallergies.click();
        await this.Homeoxygenuse.click();
        await this.Sleepapnea.click();
        await this.Respiratory_Others.click();
        await this.OthersText2.fill('Test');     
        //Liver Disease
        await this.HepatitisA.click();
        await this.HepatitisB.click();
        await this.HepatitisC.click();
        await this.LiverFailure.click();
        await this.Livertransplant.click();
        await this.LiverDisease_Others.click();
        await this.LiverDisease_OthersText.fill('Test');
        //Kidney Disease
        await this.Dialysis.click();
        await this.Kidneystones.click();
        await this.KidneyDisease_Others.click();
        await this.KidneyOthersText.fill('Test');
        //Gastrointestinal Problems
        await this.Bleedinginstool.click();
        await this.Bloodvomiting.click();
        await this.Chronicdiarrhea.click();
        await this.Constipation.click();
        await this.Gastrointestinal_Others.click();
        await this.Gastrointestinal_OthersText.fill('Test');
        //Brain stroke
        await this.BrainStroke_Yes.click();
        //Hypertension
        await this.Hypertension_Yes.click();                
        //Diabetes
        await this.Diabetes_Yes.click();
        //Any Cancer
        await this.AnyCancer_Yes.click();
        await this.page.waitForTimeout(1000);
        await this.scrollForMH.scrollIntoViewIfNeeded();
        await this.DiabetesDetails.fill(diabeteseDetails);
        await this.SubclinicalHypothyroidism.fill(Subclinical_Hypothyroidism);
        await this.asthmaTextField.fill(asthma);
        await this.page.waitForTimeout(1000);
        await this.MH_SubmitButton.click();
        await this.page.waitForTimeout(3000);
        await expect(this.toast_MH).toHaveText('Medical History updated successfully.');
        await this.page.waitForTimeout(1000);
        await this.MedicalHistoryButton.click();
    }

    async click_SurgeryHistory(){
        await this.SurgeryHistoryButton.click();
        await this.page.waitForTimeout(1000);
    }

    async Edit_SurgeryHistory(){
        await this.Surgery_EditButton.click();
        await this.Tonsilsremoval.click();
        await this.ThyroidSurgery.click();
        await this.Heartsurgery.click();
        await this.Gallbladderremoval.click();  
        await this.Appendixsurgery.click();
        await this.KneeHipReplacement.click();
        await this.SurgeryHistory_Others.click();
        await this.SurgeryHistory_OthersText.fill('Test Surgery');
        await this.Gallbladderremoval.click(); 
        await this.Tonsilsremoval.click();
        await this.KneeHipReplacement.click();
        await this.page.waitForTimeout(1000);
        await this.SH_SubmitButton.click();
        await this.page.waitForTimeout(3000);
        await expect(this.toast_SH).toHaveText('Surgical History updated successfully.');
        await this.page.waitForTimeout(1000);
        await this.SurgeryHistoryButton.click();
    }

    async click_FamilyHistory(){
        await this.FamilyHistoryButton.click();
        await this.page.waitForTimeout(1000);
    }

    async Edit_FamilyHistory(){
        await this.FamilyHistory_EditButton.click();
        await this.Bleedingdisorder.click();
        await this.Stroke.click();  
        await this.Cancer.click();
        await this.Diabetes.click();
        await this.Heartdisease.click();
        await this.FamilyHistory_Others.click();
        await this.FamilyHistory_OthersText.fill('Test History');
        await this.page.waitForTimeout(1000);
        await this.FH_SubmitButton.click();
        await this.page.waitForTimeout(3000);
        await expect(this.FH_Toast).toHaveText('Family History updated successfully.');
        await this.page.waitForTimeout(1000);
        await this.FamilyHistoryButton.click();
    }

    

    async click_OngoingScreen(){
        await this.ongoingbutton.click();
        await this.page.waitForTimeout(1000);
    }

    async verify_OngoingAppointments() {
        await this.page.waitForTimeout(3000);
        const OngoingCountText = await this.ongoingText.innerText();
        const Ongoing_Count = parseInt(await OngoingCountText.trim(), 10);
        if(Ongoing_Count === 0){
            const NoPatient = await this.OngoingNoData.innerText();
            console.log(NoPatient);
        }
        else{
            await this.continueButton.scrollIntoViewIfNeeded();
            await this.continueButton.click();
            await this.page.waitForTimeout(1000);
        }
    }

}
module.exports = {VideoConsultationPage};