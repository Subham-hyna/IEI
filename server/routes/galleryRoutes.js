const express = require("express");
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");
const { createActivity, getAllActivity, deleteActivity } = require("../controllers/galleryController");
const upload = require("../utils/multer");

const router = express.Router();

router.route("/admin/activity/new")
    .post(isAuthenticatedUser, authorizeRoles("admin") ,upload.single("photo"), createActivity)

router.route("/getActivity")
    .get(getAllActivity)

router.route("/admin/deleteActivity/:id")
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteActivity)

module.exports = router;

//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna