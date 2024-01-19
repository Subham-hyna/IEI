// Create Token and saving in cookie

const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("secure_iei", token, options).json({
      success: true,
      user,
      message,
      token
    });
  };
  
  module.exports = sendToken;

  //BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna