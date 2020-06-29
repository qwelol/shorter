const express = require('express')
const router = express.Router()

const usersController = require("../controllers/users")

router.get('/',usersController.getUsers);
router.get('/:api',usersController.getUser);
router.post('/register',usersController.createUser);
router.post('/login',usersController.login);
router.post('/logout',usersController.logout);
router.put('/:api',usersController.changeUser)
router.delete('/:api',usersController.deleteUser);

module.exports = router