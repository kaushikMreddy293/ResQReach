// Importing the Listing model from '../models/feed-Share.js'
import Listing from '../models/feed-Share.js';

// Importing the errorHandler function from '../utils/error.js'
import { errorHandler } from '../utils/error.js';

// Importing nodemailer for sending emails
import nodemailer from 'nodemailer';

// Importing the User model from '../models/user.js'
import User from '../models/user.js';

// Creating a nodemailer transporter using a Gmail account
const transporter = await nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'resqreach@gmail.com',
    pass: 'nkrs qwff fxam ryvy',
  },
});

// Function to handle the creation of a new listing
export const createListing = async (req, res, next) => {
  try {
    // Creating a new listing in the database
    const listing = await Listing.create(req.body);
    
    // Destructuring emailData from the request body
    const { emailData } = req.body;

    // Creating nodemailer mail options for sending email notifications
    const mailOptions = {
      from: 'resqreach@gmail.com',
      to: emailData.recipients.join(','),
      subject: 'New Listing Created',
      html: `A new Food listing named <strong>${listing.name}</strong> has been created.<br><br><br>Please grab the food at <strong>${listing.address}</strong>.<br><br><br>Thank You,<br><strong>Team ResQReach.</strong>`,
    };

    // Sending email notifications using nodemailer
    await transporter.sendMail(mailOptions);

    // Responding with the created listing
    return res.status(201).json(listing);
  } catch (error) {
    // Passing the error to the next middleware
    next(error);
  }
};

// Function to handle the deletion of a listing
export const deleteListing = async (req, res, next) => {
  // Finding the listing by ID
  const listing = await Listing.findById(req.params.id);

  // Checking if the listing exists
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  // Checking if the authenticated user is the owner of the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    // Deleting the listing from the database
    await Listing.findByIdAndDelete(req.params.id);
    
    // Responding with a success message
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    // Passing the error to the next middleware
    next(error);
  }
};

// Function to handle the update of a listing
export const updateListing = async (req, res, next) => {
  // Finding the listing by ID
  const listing = await Listing.findById(req.params.id);

  // Checking if the listing exists
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  // Checking if the authenticated user is the owner of the listing
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    // Updating the listing in the database
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Responding with the updated listing
    res.status(200).json(updatedListing);
  } catch (error) {
    // Passing the error to the next middleware
    next(error);
  }
};

// Function to handle the retrieval of a single listing by ID
export const getListing = async (req, res, next) => {
  try {
    // Finding the listing by ID
    const listing = await Listing.findById(req.params.id);

    // Checking if the listing exists
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    // Responding with the retrieved listing
    res.status(200).json(listing);
  } catch (error) {
    // Passing the error to the next middleware
    next(error);
  }
};

// Function to handle the retrieval of all listings
export const getAllListing = async (req, res, next) => {
  try {
    // Finding all listings and sorting them by creation date in descending order
    const alllisting = await Listing.find().sort({ createdAt: 'desc'  });

    // Checking if listings are found
    if (!alllisting) {
      return next(errorHandler(404, 'Listings are not found!'));
    }

    // Responding with the retrieved listings
    res.status(200).json(alllisting);
  } catch (error) {
// Passing the error to the next middleware in case of an error
next(error);
}
};

// Function to handle the retrieval of all user emails
export const getEmails = async (req, res, next) => {
  try {
    // Finding all users and fetching only their email field
    const users = await User.find({}, 'email');

    // Extracting email addresses from the user data
    const emails = users.map((user) => user.email);

    // Responding with the retrieved email addresses
    res.json(emails);
  } catch (error) {
    // Handling errors and responding with a 500 status code
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
