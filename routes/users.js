var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/usersControllers');

/* Post */
router.post("/register", (req, res) => {
  UsersControllers.register(req, res);
});

module.exports = router;
