const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const { checkAuth } = require("../services/auth");

router.get("/", checkAuth, usersController.getUsers);
router.get("/registration", usersController.registration);
router.post("/registration", usersController.createUser);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.put("/:api", checkAuth, usersController.changeUser);
router.delete("/:api", checkAuth, usersController.deleteUser);

module.exports = router;
