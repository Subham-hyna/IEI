const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const News = require("../model/newsletterModel");
const sendEmail = require("../utils/sendEmail");
const { newsletterMail } = require("../mail/newsletterMail")
const { contactUsMail } = require("../mail/contactUsMail")
const { subscribeMail } = require("../mail/subscribeMail")

//Subscribe to Letter
exports.subscribe = catchAsyncErrors( async (req,res,next) => {
    const { email } = req.body;

    const emailExist = await News.findOne({ email });

    if (emailExist) {
      return next(new ErrorHandler("You Already Subscribed", 401));
    }

    await News.create({ email });

    await sendEmail(email , "THANKS FOR SUBSCRIBING", subscribeMail());

    res.status(201).json({
        success : true,
        message : "Thank you for Subscribing Us"
    })
})

exports.sendLetters = catchAsyncErrors( async (req,res,next) => {

    const { style , body , title } = req.body;

    if( !style || !body || !title){
        return next( new ErrorHandler("Please fill all the fields" , 401));
    }

    const users = await News.find();

    users.forEach(async(user,index) => {
        await sendEmail( user.email,title,newsletterMail(style,body));
    } )

    res.status(200).json({
        success : true,
        message : "Mail sent successfully"
    })
})

exports.contactUs = catchAsyncErrors( async(req,res,next) => {
    const { name , email, query } = req.body;

    if(!name || !email || !query){
        return next(new ErrorHandler("Please fill Details Properly",401));
    }
    await sendEmail(email ,"THANKS FOR CONTACTING US",contactUsMail(name))

    res.status(200).json({
        success: true,
        message: "Thanks for Contacting"
    })
})



//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna