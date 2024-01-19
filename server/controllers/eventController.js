const Event = require("../model/eventModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("../utils/cloudinary");
const ApiFeatures = require("../utils/apiFeatures");
const fs = require("fs");

//Create a event
exports.createEvent = catchAsyncErrors( async(req,res,next) => {

    if (!req.file) {
      return next(new ErrorHandler("Please select a file"), 400);
    }

    const { title , caption , link , status, date } = req.body;

    const myCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "events"
  });


    const image = {
      public_id : myCloud.public_id,
      url : myCloud.secure_url
    }

    const event = await Event.create({
        title,
        caption,
        link,
        status,
        date,
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
        event,
        message : "Event Created Successfully"
    })
})

//Get a event
exports.getEvent = catchAsyncErrors( async(req,res,next) => {

    const resultPerPage = 6;
    const activityCount = await Event.countDocuments();

    let apiFeature = new ApiFeatures(Event.find().sort({ createdAt: -1 }),req.query)
        .search()
        .filter()
        
    let events = await apiFeature.query;
    
    let eventsFilteredCount = events.length;
    
    apiFeature = new ApiFeatures(Event.find().sort({ createdAt: -1 }),req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    events = await apiFeature.query;

    res.status(200).json({
        success : true,
        events,
        activityCount,
        resultPerPage,
        eventsFilteredCount
    })
})

//Get Single Event
exports.getSingleEvent = catchAsyncErrors( async (req,res,next)=> {

    const event = await Event.findById(req.params.id);

    if(!event){
        return next(new ErrorHandler("Invalid Event Id" , 400))
    }

    res.status(200).json({
        success : true,
        event
    })

})

//Update Event
exports.updateEvent = catchAsyncErrors( async(req,res,next) => {
    const { title , caption , link , status, date } = req.body;

    let event = await Event.findById(req.params.id);
  
    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }

    event = await Event.findByIdAndUpdate(req.params.id,{
        title,
        caption,
        link,
        status,
        date,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      })

      res.status(200).json({
        success : true,
        event
    })

})

//Update Event Poster
exports.updateEventPoster = catchAsyncErrors(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorHandler("Please select a file"), 400);
  }

  let event = await Event.findById(req.params.id);

  const imageId = event.image.public_id;
  await cloudinary.uploader.destroy(imageId);

  const image = await cloudinary.uploader.upload(req.file.path, {
    folder: "events"
  });
  
  const newEventData = {
    image : {
      public_id : image.public_id,
      url : image.secure_url        
    }
  };

  await Event.findByIdAndUpdate(req.params.id, newEventData, {
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

//Delete Event
exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
    const event = await Event.findById(req.params.id);
  
    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }
  
    const imageId = event.image.public_id;
    await cloudinary.uploader.destroy(imageId);
    
    event.photos.forEach(async(photo)=>{
      await cloudinary.uploader.destroy(photo.public_id);
    })

    await Event.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      message: "Event Delete Successfully",
    });
  });

  //Add Event Photos
  exports.addEventPhoto = catchAsyncErrors(async (req, res, next) => {

    const event = await Event.findById(req.params.id);

    if(!event){
        return next(new ErrorHandler("Invalid Event Id" , 400))
    }
    if(!req.file){
        return next(new ErrorHandler("Please Select a file" , 400))
    }

    const myCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "events"
    });

    const photo = {
      public_id : myCloud.public_id,
      url : myCloud.url
    }
  
    const added = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $push: { photos: photo },
      },
      {
        new: true,
      }
    )

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  
    if (!added) {
      return next(new ErrorHandler("Photo Not Added", 400));
    } else {
      res.status(200).json({
        success: true
      });
    }
  });

  //Remove Event Photos
  exports.removeEventPhoto = catchAsyncErrors(async (req, res, next) => {

    const photoExist = await Event.findOne({
        _id: req.params.id,
        photos: { $elemMatch: { public_id : req.body.public_id } },
    });

    if(!photoExist){
        return next(new ErrorHandler("Photo Not Found",400))
    }
  
    await cloudinary.uploader.destroy(req.body.public_id);

    const remove = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { photos: { public_id : req.body.public_id} } ,
      },
      {
        new: true,
      }
    )
  
    if (!remove) {
      return next(new ErrorHandler("Photo Not Removed", 400));
    } else {
      res.status(200).json({
        success: true
      });
    }
  });



  //BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna