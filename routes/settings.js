const express = require('express')
const router = express.Router()

const settingsController = require("../controllers/settings")

router.get('/',settingsController.getSettings);
router.get('/:api',settingsController.getUserSettings);
router.post('/',settingsController.createSettings);
router.put('/:api&&:service',settingsController.changeSettings);
router.delete('/:api&&:service',settingsController.deleteSettings);

module.exports = router