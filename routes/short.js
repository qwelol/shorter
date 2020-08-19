const express = require("express");
const router = express.Router();

const shortController = require("../controllers/short");
const { checkAuth, checkInRole } = require("../services/auth");
const { ROLES } = require("../services/roles");

router.get(
  "/",
  checkAuth,
  checkInRole(ROLES.Admin, ROLES.Customer),
  shortController.getShortLink
);
router.post(
  "/",
  checkAuth,
  checkInRole(ROLES.Admin, ROLES.Customer),
  shortController.createShortLink
);
router.delete(
  "/:id",
  checkAuth,
  checkInRole(ROLES.Admin, ROLES.Customer),
  shortController.deleteShortLink
);

module.exports = router;
