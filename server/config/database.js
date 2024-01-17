const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI).then(() => {
    console.log("Database Connected Successfully");
  });
};

module.exports = connectDatabase;



//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna