const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const { checkAuth, checkInRole } = require("../services/auth");
const { ROLES } = require("../services/roles");

router.get("/", checkAuth, checkInRole(ROLES.Admin), usersController.getUsers);
router.get("/registration", usersController.registration);
router.get("/:api", checkAuth, checkInRole(ROLES.Admin), usersController.getUser)
router.post("/registration", usersController.createUser);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.put("/:api", checkAuth, checkInRole(ROLES.Admin), usersController.changeUser);
router.delete("/:api", checkAuth, checkInRole(ROLES.Admin), usersController.deleteUser);

module.exports = router;
