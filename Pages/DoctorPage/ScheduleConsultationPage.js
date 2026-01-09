const {expect} = require ('@playwright/test');
class ScheduleConsultaionPage{
    constructor(page){
        this.page = page;
        this.ScheduleConsultation = page.locator('(//p[@class="icon-head"])[1]');
        this.scheduleButton = page.locator('(//div[@class="card type-card"])[3]/div');
        this.scheduleCount = page.locator('(//div[@class="text-center mt-2"])[3]/span');
        this.NoScheduleText = page.locator('//div[@class="card-body text-center"]/p');
        this.detailsButton = page.locator('(//div[@class="col"])[1]/button[1]');
        this.EditButton = page.locator('(//div[@class="col"])[1]/button[2]');
        this.ViewEHR = page.locator('(//div[@class="rectangle-view"])/button');
        this.Reports = page.locator('//a[text()="Reports"]');
        this.MedicalHistory = page.locator('//a[text()="Medical History"]');
        this.SurgeryHistory = page.locator('//a[text()="Surgery History"]');
        this.FamilyHistory = page.locator('//a[text()="Family History"]');
        this.Allergies = page.locator('//a[text()="Allergies"]');
        this.Medications = page.locator('//a[text()="Medications"]');
        this.LifeStyle = page.locator('//a[text()="Life Style"]');
        this.closeEHR = page.locator('//div[@class="rectangle-view"]/button');
        this.backButton = page.locator('(//div[@class="textfloat"])/button');
        
        //Edit
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
        this.videoButtonOn = page.locator('//button[@title="Video On"]');
        this.joinCallbutton = page.locator('//button[@id="button-join1"]');

    }

    //To navigate to Schedule Consultation Page
    async Navigate_scheduleconsultationScreen(){
        await this.page.waitForTimeout(1000);
        await this.ScheduleConsultation.click();
        await this.page.waitForTimeout(1000);
    }

    async Navigate_ScheduleScreen(){
        await this.scheduleButton.click();
        await this.page.waitForTimeout(1000);
        const scheduleCountText = await this.scheduleCount.innerText();
        const schedule_Count = parseInt(await scheduleCountText.trim(), 10);
        if(schedule_Count === 0){
            const NoSchedule = await this.NoScheduleText.innerText();
            console.log(NoSchedule);  
            await this.page.pause();         
        }
        else{
            await this.page.waitForTimeout(1000);
            await this.detailsButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await this.detailsButton.click();
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
            await this.page.waitForTimeout(1000);
            await this.backButton.click();
            //Edit Functionality
            await this.scheduleButton.click();
            await this.page.waitForTimeout(1000);
            await this.detailsButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.EditButton.click();
            await this.page.waitForTimeout(1000);
            await this.dateField.click();
            await this.page.waitForTimeout(1000);
            await this.AvailableToday.click();
            await this.page.waitForTimeout(1000);
            await this.availableDoctor.click({force:true});
            await this.page.waitForTimeout(1000);
            await this.availableDoctor.press('ArrowDown');
            await this.availableDoctor.press('Enter');
            await this.selectTime.click();
            await this.selectTime.press('ArrowDown');
            await this.selectTime.press('Enter');
            await this.page.waitForTimeout(1000);
            await this.changeAppointment.click();  
            await this.page.waitForTimeout(1000);
        }
    }

    async waitingScreen(){
        await this.waitingButton.click();
        await this.page.waitForTimeout(1000);
        const WaitingCountText = await this.waitingText.innerText();
        const waiting_Count = parseInt(await WaitingCountText.trim(), 10);
        if(waiting_Count === 0){
            const NoPatient = await this.WaitingNoData.innerText();
            console.log(NoPatient);
        }
        else{
            await this.page.waitForTimeout(1000);
            await this.editbutton_waiting.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.editbutton_waiting.click();
            await this.closeIcon.click();
            await this.page.waitForTimeout(1000);
            await this.joinButton.click();
            await this.page.waitForTimeout(3000);
            await this.audioButton.click();
            await this.page.waitForTimeout(1000);   
            await this.audioButton.click();
            await this.page.waitForTimeout(1000);
            await this.videoButtonOff.click();
            await this.page.waitForTimeout(1000);   
            await this.videoButtonOn.click();
            await this.page.waitForTimeout(1000);
            await this.joinCallbutton.click();
            await this.page.waitForTimeout(5000);
            /*
            await this.diagnosis.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.followUp.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.Notes_BackButton.click();
            */
        }
    }

    async ongoingScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan, medicine, Dosage, M_Count){
        await this.ongoingbutton.click();
        const OngoingCountText = await this.ongoingText.innerText();
        const ongoing_Count = parseInt(await OngoingCountText.trim(), 10);
        if(ongoing_Count === 0){
            console.log("There is no ongoing data...");
        }
        else{
            await this.page.waitForTimeout(1000);
            await this.continueButton.scrollIntoViewIfNeeded();
            await this.continueButton.click();
            await this.page.waitForTimeout(1000);
            
        }
    }

    


}
module.exports = {ScheduleConsultaionPage};