const {expect} = require ('@playwright/test');
const {WaitingFlow} = require ('../DoctorPage/WaitingPage');



class OngoingFlow{
    constructor(page){
        this.page = page;
        this.ODC = page.locator('(//p[@class="icon-head"])[1]');
        //Ongoing
        this.ongoingbutton = page.locator('(//div[@class="text-center mt-2"])/p[text()="Ongoing"]');
        this.ongoingText = page.locator('(//div[@class="text-center mt-2"])[1]/span');
        this.continueButton = page.locator('(//button[@class="btn primary-btn continue-btn-size btn-secondary"])[1]');
        
        //Notes
        this.NotesText = page.locator('//div[@id="infosymptoms"]');
        this.RXText = page.locator('//fieldset[@id="fieldset-medicine"]');
        this.LabText = page.locator('//div[@id="lab-notes"]');

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
        
        const text_notes = await this.NotesText.isVisible();
        const text_rx = await this.RXText.isVisible();
        const text_lab = await this.LabText.isVisible();
        const waitingflow = new WaitingFlow(this.page);
        //const notes_value = text_notes.trim();
        if(text_notes){
            await this.page.waitForTimeout(1000);
            await waitingflow.NotesScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan);
            await this.page.waitForTimeout(1000);
            await waitingflow.RX_Flow(medicine, Dosage, M_Count);
            await this.page.waitForTimeout(1000);
            await waitingflow.LabFlow();
            await this.page.waitForTimeout(1000);
            await waitingflow.SummaryFlow();
        }
        else if(text_rx){
            await this.page.waitForTimeout(1000);
            await waitingflow.RX_Flow(medicine, Dosage, M_Count);
            await this.page.waitForTimeout(1000);
            await waitingflow.LabFlow();
            await this.page.waitForTimeout(1000);
            await waitingflow.SummaryFlow();
        }

        else if(text_lab){
            await this.page.waitForTimeout(1000);
            await waitingflow.LabFlow();
            await this.page.waitForTimeout(1000);
            await waitingflow.SummaryFlow();
        }

        else{
            await this.page.waitForTimeout(1000);
            await waitingflow.SummaryFlow();
        }
        
    }

}

module.exports = {OngoingFlow};