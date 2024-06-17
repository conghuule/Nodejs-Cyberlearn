const authorize = (arrType) => (req, res, next) => {
  const { user } = req;
  if (arrType.findIndex((ele) => ele === user.type) > -1) {
    return next();
  } else {
    res.status(403).send("Ban dan dang nhap, nhung khong quyen");
  }
};

module.exports = {
  authorize,
};
