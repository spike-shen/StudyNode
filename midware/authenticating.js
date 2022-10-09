// built in middleware 构造中间件
module.exports = (req, res, next) => {
  // console.log("authenticating..");
  next();
};
