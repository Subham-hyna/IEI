const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, updateAvatar, deleteMe } = require("../controllers/userController");
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");
const upload = require("../utils/multer");

const router = express.Router();

router.route("/register")
    .post(upload.single("photo"),registerUser);

router.route("/login")
    .post(loginUser)

router.route("/password/forgot")
    .post(forgotPassword)

router.route("/password/reset/:token")
    .put(resetPassword)

router.route("/me")
    .get(isAuthenticatedUser , getUserDetails)

router.route("/password/update")
    .put(isAuthenticatedUser, updatePassword);

router.route("/avatar/update")
    .put(isAuthenticatedUser,upload.single("photo"), updateAvatar);

router.route("/me/update")
    .put(isAuthenticatedUser, updateProfile);

router.route("/me/delete/:password")
    .delete(isAuthenticatedUser,deleteMe);

router.route("/logout")
    .get(logout)

module.exports = router;

//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna