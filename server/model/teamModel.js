const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    post:{
        type:String,
        trim: true,
        required: true
    },
    year:{
        type:Number,
        required: true
    },
    FY:{
        type:Number,
        required: true
    },
    insta:{
        type:String,
        required: true
    },
    facebook:{
        type:String,
        required: true
    },
    linkedIn:{
        type:String,
        required: true
    },
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Team", teamSchema);


//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna