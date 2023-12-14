// Importing the jsonwebtoken library for JWT (JSON Web Token) functionality
import jwt from 'jsonwebtoken';

// Importing the errorHandler function from the 'error.js' module
import { errorHandler } from './error.js';

// Middleware function to verify the authenticity of a JWT token
export const verifyToken = (req, res, next) => {
  // Extracting the JWT token from the 'access_token' cookie in the request
  const token = req.cookies.access_token;

  // Logging the token to the console for debugging purposes
  console.log(req.cookies.access_token);
  console.log(token);

  // Checking if the token is present; if not, return a 401 Unauthorized error
  if (!token) return next(errorHandler(401, 'Unauthorized'));

  // Verifying the JWT token using the secret key and handling verification results
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If there's an error in verification, return a 403 Forbidden error
    if (err) return next(errorHandler(403, 'Forbidden'));

    // If verification is successful, attach the user information to the request object
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  });
};
