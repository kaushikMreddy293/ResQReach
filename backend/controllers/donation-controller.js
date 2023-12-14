// Importing bcryptjs for password hashing
import bcryptjs from 'bcryptjs';

// Importing the errorHandler function from '../utils/error.js'
import { errorHandler } from '../utils/error.js';

// Importing jsonwebtoken for token generation and verification
import jwt from 'jsonwebtoken';

// Importing the Stripe library for payment processing
import stripe from 'stripe';

// Creating a Stripe instance with the provided secret key
const stripeInstance = stripe('sk_test_51OLCk5EWEm77uzFJMMQF4OESfCZY5xmuIEmULj3vtubWVJOkp9mmfFV0ToJipcYtNFmLQIh5cEPxMbyJMJrxoXPk00eUs33zTK');

// Importing successResponse, errorResponse, and deleteResponse from response-handler.js
import { successResponse, errorResponse, deleteResponse } from './response-handler.js';

// Function to handle the donation process
export const donate = async (req, res) => {
    // Creating an array of line items for the donation
    const lineItems = [{
        price_data: {
            currency: "usd",
            product_data: {
                name: "Donation"
            },
            unit_amount: "5000",
        },
        quantity: "1"
    }];

    try {
        // Creating a checkout session with the Stripe API
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/donation/success",
            cancel_url: "http://localhost:3000/donation/"
        });

        // Responding with the session ID for client-side redirection
        res.json({ id: session.id });
    } catch (error) {
        // Handling errors and responding with an error message
        res.status(500).json(errorResponse('Failed to create checkout session.'));
    }
};
