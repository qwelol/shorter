const express = require('express')
const router = express.Router()

const usersController = require("../controllers/users")
const checkAuth = require("../services/auth").checkAuth

router.get('/', checkAuth,usersController.getUsers);
router.get('/:api', checkAuth,usersController.getUser);
router.post('/register',usersController.createUser);
router.post('/login',usersController.login);
router.post('/logout',usersController.logout);
router.put('/:api', checkAuth,usersController.changeUser)
router.delete('/:api', checkAuth,usersController.deleteUser);

module.exports = router