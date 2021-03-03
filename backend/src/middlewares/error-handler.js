// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Something unexpected happened" });
};

export default errorHandler;
