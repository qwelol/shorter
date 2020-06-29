const express = require('express')
const router = express.Router()

const settingsController = require("../controllers/settings")
const checkAuth = require("../services/auth").checkAuth

router.get('/',checkAuth, settingsController.getUserSettings);
router.post('/',settingsController.createSettings);
router.put('/:api&&:service',settingsController.changeSettings);
router.delete('/:api&&:service',settingsController.deleteSettings);

module.exports = router