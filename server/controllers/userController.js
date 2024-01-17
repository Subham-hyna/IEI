const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel");
const News = require("../model/newsletterModel");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const {registerMail} = require("../mail/registrationMail");
const { passwordResetMail } = require("../mail/passwordResetMail");


//Register User
exports.registerUser = catchAsyncErrors( async (req , res, next) => {
    const { name , email , phone , password } = req.body;
    
    const userExist = await User.findOne({ email });

    if (userExist) {
      return next(new ErrorHandler("Email already exist", 401));
    }

    let image;

    if (req.file) {
       image = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars"
      });
    }
    else{
      image = await cloudinary.uploader.upload("https://res.cloudinary.com/ddr1kuyb3/image/upload/v1705222130/avatars/defaultAvatar_yqtcrs.png", {
        folder: "avatars"
      });
    }

    const avatar = {
      public_id : image.public_id,
      url : image.secure_url
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
        avatar
    })

    const emailExist = await News.findOne({ email });

    if(!emailExist){ 
      await News.create({ email });
    }

    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    sendToken(user , 201 , res, "Registered Successfully");
    await sendEmail( user.email, "Welcome to IEI", registerMail(user.name));

})

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    sendToken(user, 200, res, "Logged In successfully");
  });

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("secure_iei", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = process.env.RESET_LINK + resetToken ;
  
    try {
      await sendEmail(user.email , "Password Reset Request" , passwordResetMail(user.name , resetPasswordUrl));
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }
  });

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not password", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res , "Logged In successfully");
  });

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);
  
    res.status(200).json({
      success: true,
      user,
    });
  }); 

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res , "Password Updated");
  });

//Update Avatar
exports.updateAvatar = catchAsyncErrors(async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler("Please select a file"), 400);
    }

    let user = await User.findById(req.user._id);

    const imageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);

    const image = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars"
    });
    
    const newUserData = {
      avatar : {
        public_id : image.public_id,
        url : image.secure_url        
      }
    };
  
    user = await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  
    res.status(200).json({
      success: true,
      user,
    });
  });

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      year: req.body.year,
      semester: req.body.semester,
      institute: req.body.institute,
      department: req.body.department,
    };
  
    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      user
    });
  });

//Delete user
exports.deleteMe = catchAsyncErrors( async(req,res,next)=>{

  const user = await User.findById(req.user._id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.params.password);
  
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  const imageId = user.avatar.public_id;
  await cloudinary.uploader.destroy(imageId);

  await User.findByIdAndDelete(req.user._id);
  
  res.cookie("secure_iei", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Account Deleted",
  });
})


//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna