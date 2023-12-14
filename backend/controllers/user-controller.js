import { log } from 'console';
import { updateUserById } from '../services/user-service.js'; // Import the user service
import { errorHandler } from '../utils/error.js';
import { successResponse, errorResponse, deleteResponse } from './response-handler.js'; // Import response handling functions
import bcryptjs from 'bcryptjs';
const userAddedMessage = "User Created Successfully.";
import Listing from '../models/feed-Share.js';
const userDeletedMessage = "User Deleted Successfully.";
import User from '../models/user.js'; 
// To create a new user
export const create = async (request, response) => {
  try {
    const newUser = { ...request.body };
    const user = await userService.create(newUser);
    successResponse(userAddedMessage, response);
  } catch (error) {
    errorResponse(error, response);
  }
};

// To get all users
export const getAll = async (request, response) => {
  try {
    const params = { ...request.query };
    const users = await userService.getAll(params);
    successResponse(users, response);
  } catch (error) {
    errorResponse(error, response);
  }
};

export const getUserListings = async (req, res, next) => {
  console.log('req.user.id:', req.user.id);
  console.log('req.user.id:', req.params.id);
  if (req.user.id === req.params.id) 
   {
    try {
      const listings = await Listing.find({ userRef: req.params.id })
      .sort({ createdAt: 'desc' })  // Sort by createdAt in descending order
      .exec();
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  }
  //  else {
  //   return next(errorHandler(401, 'You can only view your own listings!'));
  // }
};

// To get a user by ID
export const getById = async (request, response) => {
  try {
    const id = request.params.id;
    const user = await userService.getById(id);
    successResponse(user, response);
  } catch (error) {
    errorResponse(error, response);
  }
};

//To update a user by ID
export const updateById = async (req, res,next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
// To delete a user by ID
export const deleteById = async (request, response,next) => {
  // console.log(request.user.id);
  // console.log(request.params.id);
  if (request.user.id !== request.params.id)
  {
    return next(errorHandler(401, 'You can only update your own account!'));
  }
  
  try {
    await User.findByIdAndDelete(request.params.id);
    response.clearCookie('access_token');
    response.status(200).json('User has been deleted!');
  }
  catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};