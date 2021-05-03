const express = require('express');
const users = require('package');
const encode = require('../middlewares/jwt').encode;

const router = express.Router();

router.post('/login/:userId', encode, (req, res, next) => {

});

export default router;
