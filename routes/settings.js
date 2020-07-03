const express = require('express')
const router = express.Router()

const settingsController = require("../controllers/settings")
const checkAuth = require("../services/auth").checkAuth

router.get('/',checkAuth, settingsController.getUserSettings);
router.post('/', checkAuth, settingsController.createSettings);
router.put('/:service', checkAuth,settingsController.changeSettings);
router.delete('/:service', checkAuth,settingsController.deleteSettings);

module.exports = router