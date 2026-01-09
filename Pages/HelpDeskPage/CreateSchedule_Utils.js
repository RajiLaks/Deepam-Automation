export async function ScheduleAppointment(dashboardPage, dataset) {
    await dashboardPage.clickView()
    await dashboardPage.ScheduleTime({Schedule: dataset[0].Schedule})
    await dashboardPage.ScheduleAppointment()
}