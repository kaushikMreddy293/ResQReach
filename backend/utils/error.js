// Exported function to create and return an error object with specified status code and message
export const errorHandler = (statusCode, message) => {
  // Creating a new Error object
  const error = new Error();

  // Setting the status code of the error object
  error.statusCode = statusCode;

  // Setting the error message of the error object
  error.message = message;

  // Returning the error object
  return error;
};
