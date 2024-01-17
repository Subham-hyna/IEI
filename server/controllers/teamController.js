const Team = require("../model/teamModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const fs = require("fs");
const ApiFeatures = require("../utils/apiFeatures")

//Add a member
exports.addMember = catchAsyncErrors( async (req,res,next) => {
    const { name , post , year , FY , insta , facebook , linkedIn } = req.body;

    let myCloud;

    if (req.file) {
       myCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "teams"
      });
    }
    else{
      myCloud = await cloudinary.uploader.upload("https://res.cloudinary.com/ddr1kuyb3/image/upload/v1705222130/avatars/defaultAvatar_yqtcrs.png", {
        folder: "teams"
      });
    }

    const image = {
      public_id : myCloud.public_id,
      url : myCloud.secure_url
    }
    const member = await Team.create({
        name,
        post,
        year,
        FY,
        insta,
        facebook,
        linkedIn,
        image
    })
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    res.status(201).json({
        success : true,
        member,
        message : "Member Created Successfully"
    })
})

//Get a member
exports.getMembers = catchAsyncErrors( async(req,res,next) => {

    let apiFeature = new ApiFeatures(Team.find(),req.query)
        .filter()

    let members = await apiFeature.query;

    const fourthYears = members.filter((member) => {
        return member.year === 4;
    } )

    const thirdYears = members.filter((member) => {
        return member.year === 3;
    } )

    const secondYears = members.filter((member) => {
        return member.year === 2;
    } )

    const fic = members.filter((member) => {
        return member.year === 5;
    } )

    res.status(200).json({
        success : true,
        fourthYears,
        thirdYears,
        secondYears,
        fic
    })
})

//Edit Member
exports.updateMember = catchAsyncErrors( async(req,res,next) => {
    const { name , post , year , FY , insta , facebook , linkedIn } = req.body;

    let member = await Team.findById(req.params.id);
  
    if (!member) {
      return next(new ErrorHandler("Member not found", 404));
    }

    member = await Team.findByIdAndUpdate(req.params.id,{
        name,
        post,
        year,
        FY,
        insta,
        facebook,
        linkedIn
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      })

      res.status(200).json({
        success : true,
        member
    })

})

//Update Avatar
exports.updateTeamAvatar = catchAsyncErrors(async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler("Please select a file"), 400);
    }

    let member = await Team.findById(req.params.id);

    const imageId = member.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);

    const image = await cloudinary.uploader.upload(req.file.path, {
      folder: "team"
    });
    
    const newMemberData = {
      avatar : {
        public_id : image.public_id,
        url : image.secure_url        
      }
    };
  
    await Team.findByIdAndUpdate(req.params.id, newMemberData, {
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
      success: true
    });
  });

//Delete Member
exports.deleteMember = catchAsyncErrors(async (req, res, next) => {
    const member = await Team.findById(req.params.id);
  
    if (!member) {
      return next(new ErrorHandler("Member not found", 404));
    }
    
    const imageId = member.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);

    await Team.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      message: "Member Deleted Successfully",
    });
});



//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna