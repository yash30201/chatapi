const express = require('express');
const users = require('../controllers/user');
const encode = require('../middlewares/jwt').encode;

const router = express.Router();

router.post('/login/:userId', encode, (req, res, next) => {

});

module.exports = router;
