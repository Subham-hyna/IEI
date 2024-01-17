const express = require("express");
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");
const { addMember, getMembers, updateMember, deleteMember, updateTeamAvatar } = require("../controllers/teamController");
const upload = require("../utils/multer");

const router = express.Router();

router.route("/admin/addMember")
    .post(isAuthenticatedUser , authorizeRoles("admin"), upload.single("photo"), addMember)

router.route("/getMember")
    .get(getMembers)

router.route("/admin/updateMember/:id")
    .put(isAuthenticatedUser , authorizeRoles("admin") ,updateMember)

router.route("/admin/team/updateAvatar/:id")
    .put(isAuthenticatedUser , authorizeRoles("admin"), upload.single("photo"), updateTeamAvatar)
    
router.route("/admin/deleteMember/:id")
    .delete(isAuthenticatedUser , authorizeRoles("admin") ,deleteMember)

module.exports = router;

//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna