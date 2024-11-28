const errorHanlder = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Interval server error",
  });
};

export default errorHanlder;
