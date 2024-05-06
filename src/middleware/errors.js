const ApiError = require('../utils/catchAPIError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
};
module.exports = errorHandler;
