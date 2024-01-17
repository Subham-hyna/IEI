const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
    email:{
        type:"String",
        required :true,
        unique : true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Newsletter", newsletterSchema);


//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna