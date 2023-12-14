// Importing the User model from '../models/user.js'
import User from '../models/user.js';

// Importing bcryptjs for password hashing
import bcryptjs from 'bcryptjs';

// Importing the errorHandler function from '../utils/error.js'
import { errorHandler } from '../utils/error.js';

// Importing jsonwebtoken for token generation and verification
import jwt from 'jsonwebtoken';

// Function to handle user signup
export const signup = async (req, res, next) => {
  // Destructuring user input from the request body
  const { username, email, password } = req.body;

  // Hashing the password using bcryptjs
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Creating a new User instance with the hashed password
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    // Saving the new user to the database
    await newUser.save();
    // Responding with a success message
    res.status(201).json('User created successfully!');
  } catch (error) {
    // Passing the error to the next middleware
    next(error);
  }
};

// Function to handle user signin
export const signin = async (req, res, next) => {
  // Destructuring user input from the request body
  const { email, password } = req.body;

  try {
    // Finding a user with the provided email
    const validUser = await User.findOne({ email });

    // If user not found, return a 404 error
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    // Comparing the provided password with the hashed password in the database
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    // If passwords don't match, return a 401 error
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Generating a JWT token for authentication
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Omitting the password from the user data and sending the token in a cookie
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    // Passing the error to the next middleware
    next(error);
  }
};

// Function to handle Google authentication
export const google = async (req, res, next) => {
  try {
    // Finding a user with the provided Google email
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // If user exists, generate a token and respond with user data
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // If user doesn't exist, create a new user with a random password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      // Hashing the generated password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Creating a new User instance with Google account information
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      // Saving the new user to the database
      await newUser.save();

      // Generating a token for the new user and responding with user data
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    // Passing the error to the next middleware
    next(error);
  }
};

// Function to handle user signout
export const signOut = async (req, res, next) => {
  try {
    // Clearing the access_token cookie for logout
    res.clearCookie('access_token');
    // Responding with a success message
    res.status(200).json('User has been logged out!');
  } catch (error) {
    // Passing the error to the next middleware
    next(error);
  }
};
