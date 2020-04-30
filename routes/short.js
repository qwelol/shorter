const express = require('express')
const router = express.Router()

const shortController = require("../controllers/short")

router.get('/',shortController.getShortLink);
router.post('/',shortController.postShortLink);
router.delete('/:api&&:url',shortController.deleteShortLink);

module.exports = router