// Importing the Express framework to create a router
import express from 'express';

// Importing controller functions from report-controller.js for handling incident report-related routes
import * as reportController from '../controllers/report-controller.js';

// Creating an instance of Express Router
const router = express.Router();

// Custom routes for better readability

// Route for creating a new incident report (POST /reports/create)
router.route('/create')
    .post(reportController.postIncidentReport);

// Route for retrieving all incident reports (GET /reports)
router.route('/')
    .get(reportController.getAllIncidentReports);

// Route for retrieving a specific incident report by ID (GET /reports/fetch/:id)
router.route('/fetch/:id')
    .get(reportController.getIncidentReportByID);

// Route for updating a specific incident report by ID (PUT /reports/update/:id)
router.route('/update/:id')
    .put(reportController.updateIncidentReport);

// Route for deleting a specific incident report by ID (DELETE /reports/delete/:id)
router.route('/delete/:id')
    .delete(reportController.deleteIncidentReport);

// Test route for checking if the router is working (GET /reports/test)
router.route('/test')
    .get((req, res) => res.send('Testing'));

// Exporting the router to be used in other parts of the application
export default router;
