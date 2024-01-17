const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
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

module.exports = mongoose.model("Gallery", gallerySchema);


//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna