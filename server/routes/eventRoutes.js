const express = require("express");
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");
const { createEvent, updateEvent, deleteEvent, getEvent, getSingleEvent, addEventPhoto, removeEventPhoto, updateEventPoster } = require("../controllers/eventController");
const upload = require("../utils/multer");

const router = express.Router();

router.route("/admin/addEvent")
    .post(isAuthenticatedUser , authorizeRoles("admin"), upload.single("photo") , createEvent)

router.route("/getEvent")
    .get(getEvent)

router.route("/getEvent/:id")
    .get(getSingleEvent)

router.route("/admin/event/addPhoto/:id")
    .put(isAuthenticatedUser,authorizeRoles("admin"),upload.single("photo"),addEventPhoto)

router.route("/admin/event/removePhoto/:id")
    .put(isAuthenticatedUser,authorizeRoles("admin"),removeEventPhoto)

router.route("/admin/updateEvent/:id")
    .put(isAuthenticatedUser , authorizeRoles("admin") , updateEvent)

router.route("/admin/event/updatePoster/:id")
    .put(isAuthenticatedUser , authorizeRoles("admin"), upload.single("photo"), updateEventPoster)
    
router.route("/admin/deleteEvent/:id")
    .delete(isAuthenticatedUser , authorizeRoles("admin") , deleteEvent)

module.exports = router;


//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna