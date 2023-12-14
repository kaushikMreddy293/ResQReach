// Importing required modules
import { request, response } from 'express';
import * as reportService from '../services/report-service.js';  // Importing the report service functions
import { successResponse, errorResponse, deleteResponse, updateResponse } from './response-handler.js';  // Importing response handling functions

// Messages for success responses
const reportAddedMessage = "Report Created Successfully.";
const reportDeletedMessage = "Report Deleted Successfully.";
const reportUpdatedMessage = "Report Updated Successfully.";

// Controller function to save a new incident report
export const postIncidentReport = async (request, response) => {
  try {
    const newReport = { ...request.body };  // Creating a new report object from request body
    const report = await reportService.postIncidentReport(newReport);  // Calling the service function to save the report
    successResponse(reportAddedMessage, response);  // Responding with success message
  } catch (error) {
    errorResponse(error, response);  // Responding with error message in case of failure
  }
}

// Controller function to get all incident reports
export const getAllIncidentReports = async (request, response) => {
  try {
    const params = { ...request.query };  // Extracting parameters from the request query
    const reports = await reportService.getAllIncidentReports(params);  // Calling the service function to get all reports
    successResponse(reports, response);  // Responding with success and the retrieved reports
  } catch (error) {
    errorResponse(error, response);  // Responding with error message in case of failure
  }
}

// Controller function to get an incident report by ID
export const getIncidentReportByID = async (request, response) => {
  try {
    const id = request.params.id;  // Extracting the report ID from the request parameters
    const report = await reportService.getIncidentReportById(id);  // Calling the service function to get a report by ID
    successResponse(report, response);  // Responding with success and the retrieved report
  } catch (error) {
    errorResponse(error, response);  // Responding with error message in case of failure
  }
}

// Controller function to delete an incident report by ID
export const deleteIncidentReport = async (request, response) => {
  try {
    const id = request.params.id;  // Extracting the report ID from the request parameters
    const report = await reportService.deleteIncidentReport(id);  // Calling the service function to delete a report by ID
    deleteResponse(reportDeletedMessage, response);  // Responding with success message for deletion
  } catch (error) {
    errorResponse(error, response);  // Responding with error message in case of failure
  }
}

// Controller function to update an incident report by ID
export const updateIncidentReport = async (request, response) => {
  try {
    const id = request.params.id;  // Extracting the report ID from the request parameters
    const updatedReport = { ...request.body };  // Creating an updated report object from request body
    const report = await reportService.updateIncidentReport(updatedReport, id);  // Calling the service function to update a report by ID
    updateResponse(reportUpdatedMessage, response);  // Responding with success message for update
  } catch (err) {
    errorResponse(err, response);  // Responding with error message in case of failure
  }
}
