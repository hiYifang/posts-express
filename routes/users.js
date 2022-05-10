var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/usersControllers');

router.post('/register', UsersControllers.register);

module.exports = router;
