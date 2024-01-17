const express = require("express");
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");
const { subscribe, sendLetters, contactUs } = require("../controllers/newsletterController");

const router = express.Router();

router.route("/subscribe")
    .post(subscribe)

router.route("/admin/sendletters")
    .post(isAuthenticatedUser , authorizeRoles("admin"), sendLetters)

router.route("/contactUs")
    .post(contactUs);

module.exports = router;

//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna