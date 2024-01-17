const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    caption:{
        type: String,
        required: true
    },
    link:{
        type: String
    },
    status:{
        type: String,
        required: true
    },
    photos:[
        {
            public_id: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
        }
    ],
    date:{
        type: String
    },
    image: {
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

module.exports = mongoose.model("Event", eventSchema);



//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna