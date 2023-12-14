// Importing the router for handling report-related routes
import reportRouter from './report-route.js';

// Importing the router for handling guide-related routes
import guideRouter from './guide-route.js';

// Importing the router for handling user-related routes
import userRouter from './user-route.js';

// Importing the router for handling authentication-related routes
import authRouter from './auth.route.js';

// Importing the router for handling feed and share-related routes
import listingRouter from './feedshare.route.js';

// Importing the router for handling donation-related routes
import donationRouter from './donation.route.js';

// Importing the router for handling review-related routes
import reviewRouter from './reviewRoutes.js';

// Exporting a function that sets up route handling on the provided Express app
export default (app) => {
    // Mounting the reportRouter at the '/reports' path
    app.use('/reports', reportRouter);

    // Mounting the guideRouter at the '/guides' path
    app.use('/guides', guideRouter);

    // Mounting the userRouter at the '/users' path
    app.use('/users', userRouter);

    // Mounting the authRouter at the '/auth' path
    app.use('/auth', authRouter);

    // Mounting the listingRouter at the '/listing' path
    app.use('/listing', listingRouter);

    // Mounting the donationRouter at the '/donation' path
    app.use('/donation', donationRouter);

    // Mounting the reviewRouter at the '/reviews' path
    app.use('/reviews', reviewRouter);

    // Setting up a route for the root path that responds with a simple message
    app.get('/', (request, response) => response.send('Hello ResQReach'));

    // Error handling middleware to catch and respond to errors
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message,
        });
    });
}
