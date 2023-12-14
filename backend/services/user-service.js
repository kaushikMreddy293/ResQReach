import User from '../models/user.js'; // Import the user model
import bcryptjs from 'bcryptjs';

// Create a user using mongoose function
export const create = async (userData) => {
  const newUser = new User(userData); // Create a new user instance with the provided data
  return await newUser.save(); // Save the new user to the database
};

// Get all users using mongoose function
export const getAll = async (params = {}) => {
  const users = await User.find(params).exec(); // Find all users matching the provided parameters
  return users; // Return the found users
};

// Get a user by ID using mongoose function
export const getById = async (id) => {
  return await User.findById(id).exec(); // Find a user by their ID
};

// Update the Specific User Details 
export async function updateUserById(userId, userData) {
  if (userData.password) {
    userData.password = bcryptjs.hashSync(userData.password, 10);  // Hash the Password
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        avatar: userData.avatar,
      },
    },
    { new: true }
  );

  return updatedUser;
}

// Delete a user by ID using mongoose function
export const deleteById = async (id) => {
  return await User.findByIdAndDelete(id).exec(); // Find and delete a user by their ID
};
