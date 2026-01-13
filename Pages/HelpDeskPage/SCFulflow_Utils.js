export async function ScheduleConsulation(dashboardPage, dataset) {

    await dashboardPage.SCOpen();
 
    await dashboardPage.AvailabilityFill({
        Specialty: dataset[0].Specialty,
        Gender: dataset[1].Gender,
        Date: dataset[0].Date,
        Time: dataset[0].Time,
    });
 
    await dashboardPage.SearchClick()
    await dashboardPage.clickView()
    await dashboardPage.ScheduleTime({Schedule: dataset[0].Schedule})
    await dashboardPage.ScheduleAppointment()

//Click Next without entering any fields
    await dashboardPage.GetStartedSearch(dataset[0].Search)
    await dashboardPage.selectPatientByName(dataset[0].PatientName)
    await dashboardPage.clickNext()

    //Scroll down and click Continue in Vitals
    await dashboardPage.VitalsContinue()
    await dashboardPage.ScheduleSummaryContinue()
    await dashboardPage.ScheduleSummaryConfirmYes()
    await dashboardPage.PaymentConfirmation()
    await dashboardPage.PaymentConfirmYes()

}