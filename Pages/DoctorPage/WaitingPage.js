const {expect} = require ('@playwright/test');
const {OngoingFlow} = require ('../DoctorPage/OngoingPage');
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

        //EHR
        this.EH_BackButton = page.locator('//div[@class="col-12 close-button"]/button[1]');
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
        this.asthmaTextField = page.locator('(//input[@class="profile-input  form-control"])[7]');
        this.MH_SubmitButton = page.locator('(//div[@align="end"])[1]/button[2]');
        this.scrollForMH = page.locator('(//div[@class="col"]/div[@align="end"])[1]');
        this.toast_MH = page.locator('//p[text()="Medical History updated successfully."]');

        //Surgery History paths
        this.surgeryHistory = page.locator('(//div[@class="row emraccordionrow"])[3]/a[@role="button"]');
        this.SH_EditButton = page.locator('(//div[@class="text-end"])[2]/button');
        this.Tonsils = page.locator('//label[text()="Thyroid surgery"]');
        this.SH_SubmitButton = page.locator('(//div[@align="end"])[2]/button[2]');
        this.toast_SH = page.locator('//p[text()="Surgical History updated successfully."]');

        //Family History
        this.familyHistory = page.locator('(//div[@class="row emraccordionrow"])[4]/a[@role="button"]');
        this.FH_EditButton = page.locator('(//div[@class="text-end"])[3]/button');
        this.BleedingDisorder = page.locator('//label[text()="Bleeding disorder"]');
        this.Cancer = page.locator('//label[text()="Cancer"]');
        this.FH_SubmitButton = page.locator('(//div[@align="end"])[3]/button[2]');
        this.FH_Toast = page.locator('//p[text()="Family History updated successfully."]');

        //Allergies
        this.allergies = page.locator('(//div[@class="row emraccordionrow"])[5]/a[@role="button"]');

        //On Examination
        this.OnExamination = page.locator('(//div[@class="row emraccordionrow"])[6]/a[@role="button"]');

        //Medications
        this.medications = page.locator('(//div[@class="row emraccordionrow"])[7]/a[@role="button"]');

        //Life Style
        this.Lifestyle = page.locator('(//div[@class="row emraccordionrow"])[8]/a[@role="button"]');

        //Appointment History
        this.Appointmenthistory = page.locator('(//div[@class="row emraccordionrow"])[9]/a[@role="button"]')
        //Reports
        this.reports = page.locator('(//div[@class="row emraccordionrow"])[10]/a[@role="button"]');
        this.EHR_nextButton = page.locator('//div[@class="col-12 close-button"]/button[2]');


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
            await this.diagnosis.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.followUp.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.Notes_BackButton.click();
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

    async MedicalHistoryDropDown(diabeteseDetails, Subclinical_Hypothyroidism, asthma){
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
        await this.SubclinicalHypothyroidism.fill(Subclinical_Hypothyroidism);
        await this.page.waitForTimeout(500);
        await this.scrollForMH.scrollIntoViewIfNeeded();
        await this.asthmaTextField.fill(asthma);
        await this.page.waitForTimeout(500);
        await this.MH_SubmitButton.click();
        await this.page.waitForTimeout(3000);
        const MH_ToastMsg = await this.toast_MH.innerText();
        console.log(MH_ToastMsg);
        await expect(this.toast_MH).toHaveText('Medical History updated successfully.');
    }

    async Surgery_History(){
        await this.surgeryHistory.click();
        await this.page.waitForTimeout(500);
        await this.SH_EditButton.click();
        await this.familyHistory.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.Tonsils.click();
        await this.page.waitForTimeout(500);
        await this.SH_SubmitButton.click();
        await this.page.waitForTimeout(500);
        await expect(this.toast_SH).toHaveText('Surgical History updated successfully.');
        
    }

    async Family_History(){
        await this.familyHistory.click();
        await this.page.waitForTimeout(1000);
        await this.FH_EditButton.click();
        await this.page.waitForTimeout(500);
        await this.BleedingDisorder.click();
        await this.page.waitForTimeout(500);
        await this.Cancer.click();
        await this.page.waitForTimeout(500);
        await this.FH_SubmitButton.click();
        await this.page.waitForTimeout(500);
        await expect(this.FH_Toast).toHaveText('Family History updated successfully.');
    }

    async Allergies_Dropdown(){
        await this.allergies.click();
        await this.page.waitForTimeout(2000);
        await this.allergies.click();
    }
    async On_Examination(){
        await this.OnExamination.click();
        await this.page.waitForTimeout(2000);
        await this.OnExamination.click();
    }
    async Medicationdropdown(){
        await this.medications.click();
        await this.page.waitForTimeout(1000);
        await this.medications.click();
    }
    async Life_Style(){
        await this.Lifestyle.click();
        await this.page.waitForTimeout(1000);
        await this.Lifestyle.click();
    }
    async Appointment_History(){
        await this.Appointmenthistory.click();
        await this.page.waitForTimeout(1000);
        await this.Appointmenthistory.click();
    }
    async Reports_Screen(){
        await this.reports.click();
        await this.page.waitForTimeout(1000);
        await this.reports.click();
        await this.page.waitForTimeout(1000);
        await this.EHR_nextButton.click();
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
        await this.page.waitForTimeout(1000);

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
    }

    async waitingpageAccept(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan, medicine, Dosage, M_Count){
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
            await this.EH_BackButton.click();
        }
        const ongoingflowneedstorun = new OngoingFlow(this.page);
        await ongoingflowneedstorun.ongoingScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan, medicine, Dosage, M_Count);
    }



}
module.exports = {WaitingFlow};