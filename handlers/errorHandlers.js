exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

exports.catchAllErrors = (err, req, res, next) => {
  res.status = 500;
  res.send('error', { error: err });
};
