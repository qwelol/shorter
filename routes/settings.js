const express = require("express");
const router = express.Router();

const settingsController = require("../controllers/settings");
const { checkAuth, checkInRole } = require("../services/auth");
const { ROLES } = require("../services/roles");

router.get(
  "/",
  checkAuth,
  checkInRole(ROLES.Admin, ROLES.Customer),
  settingsController.getUserSettings
);
router.post(
  "/",
  checkAuth,
  checkInRole(ROLES.Admin, ROLES.Customer),
  settingsController.createSettings
);
router.put(
  "/:service",
  checkAuth,
  checkInRole(ROLES.Admin, ROLES.Customer),
  settingsController.changeSettings
);
router.delete(
  "/:service",
  checkAuth,
  checkInRole(ROLES.Admin, ROLES.Customer),
  settingsController.deleteSettings
);

module.exports = router;
