const express = require('express')
const router = express.Router()

const shortController = require("../controllers/short")
const checkAuth = require("../services/auth").checkAuth

router.get('/',checkAuth,shortController.getShortLink);
router.post('/',shortController.postShortLink);
router.delete('/:id',shortController.deleteShortLink);

module.exports = router