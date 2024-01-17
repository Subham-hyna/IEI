const Gallery = require("../model/galleryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const ApiFeatures = require("../utils/apiFeatures")

//Create a activity
exports.createActivity = catchAsyncErrors( async(req,res,next) => {

    if (!req.file) {
        return next(new ErrorHandler("Please select a file"), 400);
    }

    const { title } = req.body;

    const myCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "gallery"
    });

    const image = {
        public_id : myCloud.public_id,
        url : myCloud.secure_url
    }

    await Gallery.create({
        title,
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
        message : "Activity Added"
    })
})

//Get all Activitites 
exports.getAllActivity = catchAsyncErrors( async (req,res,next) => {
    
    const resultPerPage = 9;
    const activityCount = await Gallery.countDocuments();

    let apiFeature = new ApiFeatures(Gallery.find().sort({ updatedAt: -1 }),req.query)
        .search()

    let activities = await apiFeature.query;

    let activitiesFilteredCount = activities.length;

    apiFeature = new ApiFeatures(Gallery.find().sort({ updatedAt: -1 }),req.query)
        .search()
        .pagination(resultPerPage)

    activities = await apiFeature.query;

    res.status(200).json({
        success : true,
        activities,                    
        activityCount,
        resultPerPage,
        activitiesFilteredCount
    })
})

//Delete Activity
exports.deleteActivity = catchAsyncErrors(async (req, res, next) => {
    const activity = await Gallery.findById(req.params.id);
  
    if (!activity) {
      return next(new ErrorHandler("Activity not found", 404));
    }

    const imageId = activity.image.public_id;
    await cloudinary.uploader.destroy(imageId);
  
    await Gallery.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      message: "Activity Delete Successfully",
    });
});


//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna