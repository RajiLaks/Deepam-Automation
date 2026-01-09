export async function searchAvailableDoctor(dashboardPage, dataset) {
    await dashboardPage.verifyDashboardPage();
    await dashboardPage.SCOpen();
 
    await dashboardPage.AvailabilityFill({
        Specialty: dataset[0].Specialty,
        Gender: dataset[1].Gender,
        Date: dataset[0].Date,
        Time: dataset[0].Time,
    });
 
    await dashboardPage.SearchClick();
}