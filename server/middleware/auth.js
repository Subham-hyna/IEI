const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { secure_iei } = req.cookies;

  if (!secure_iei) {
    return next(new ErrorHandler("Not Logged In", 401));
  }

  const decodedData = jwt.verify(secure_iei, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData._id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};


//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna