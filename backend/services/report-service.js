import Report from '../models/report.js'

//Save service with mongoose function
export const postIncidentReport = async(newReport) => {
    const report = new Report(newReport);
    return await report.save();
}

//get all reports with mongoose function
export const getAllIncidentReports = async(params = {}) => {
    const reports = await Report.find(params).exec();
    return reports;
}

//delete a report with mongoose function
export const deleteIncidentReport = async(id) => {
    return await Report.findByIdAndDelete(id).exec();
}

//Update a report with mongoose function
export const updateIncidentReport = async (updatedReport, id) => {
    const report = await Report.findByIdAndUpdate(id, updatedReport).exec();
    return report;
}

export const getIncidentReportById = async(id) => {
    const report = await Report.findById(id).exec();
    return report;
}

// export const getIncidentReportByID = async (id) => {
//     try {
//         const report = await Report.findById(id).exec();
//         return report;
//     } catch (error) {
//         throw error;
//     }
//     };