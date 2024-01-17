const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");
const session = require("express-session");

//Setting Event Listeners limit
const EventEmitter = require("events");
class myEmitter extends EventEmitter {};
myEmitter.setMaxListeners(15);

// Config
require("dotenv").config({ path: "config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET" ,"POST", "PUT", "DELETE"]
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie:{
        ssecure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
    }
}))

// Route Imports
const user = require("./routes/userRoutes");
const gallery = require("./routes/galleryRoutes")
const team = require("./routes/teamRoutes")
const event = require("./routes/eventRoutes")
const newwsletter = require("./routes/newsletterRoutes")

app.get("/",(req,res)=>{
    res.send("Working");
})

app.use("/api/v1",user);
app.use("/api/v1",gallery);
app.use("/api/v1",team);
app.use("/api/v1",event);
app.use("/api/v1",newwsletter);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;


//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna