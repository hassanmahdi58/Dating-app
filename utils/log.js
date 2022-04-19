
// If there is a connection error, display this information
  const logError = (type = "Server Error", message = "Something went wrong") => {
    console.error(`[ERROR]: ${type} | ${message}`);
  };
  const logInfo = (type, message) => {
    console.log(`[INFO]: ${type} | ${message}`);
  };
  
  module.exports = {
    logError,
    logInfo,
  };