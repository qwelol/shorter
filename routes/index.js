
const express = require('express')
const router = express.Router()

const short = require('./short')
const users = require('./users')
const settings = require('./settings')

router.use('/short', short);
router.use('/users', users);
router.use('/settings', settings);

module.exports = router;