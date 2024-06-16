const logFeature = (req, res, next) => {
  console.log("Log feature");
  next();
};
module.exports = { logFeature };
