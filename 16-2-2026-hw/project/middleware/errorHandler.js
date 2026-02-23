const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Server Error';
  const errorCode = err.errorCode || 'E000';

  res.status(status).json({
    success: false,
    errorCode,
    message,
  });
};

export default errorHandler;