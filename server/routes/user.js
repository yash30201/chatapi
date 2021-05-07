const express = require('express');
const user = require('../controllers/user');
const { body, param } = require('express-validator');
const router = express.Router();
const { USER_TYPES } = require('../models/user');

router.get('/', user.onGetAllUsers);

router.post(
    '/',
    body('firstName').isString().notEmpty().toLowerCase(),
    body('lastName').isString().notEmpty().toLowerCase(),
    body('phoneNumber').isNumeric().custom(value => {
        if (value.length !== 10) {
            throw new Error('Invalid phone number');
        }
        return true;
    }),
    body('userType').isString().toUpperCase().custom(value => {
        if (!USER_TYPES.includes(value)) {
            throw new Error('Invalid userType, please specify consumer or developer');
        }
        return true;
    }),
    user.onCreateUser
);

// TO DO : Implement validator for uuid.v4 
router.get('/id/:id', user.onGetUserById);

router.get(
    '/phone/:number',
    param('number').isNumeric().custom(value => {
        if (value.length !== 10) {
            throw new Error('Invalid phone number');
        }
        return true;
    }),
    user.onGetUserByPhoneNumber
);

router.delete('/id/:id', user.onDeleteUserById);

router.delete(
    '/phone/:number',
    param('number').isNumeric().custom(value => {
        if (value.length !== 10) {
            throw new Error('Invalid phone number');
        }
        return true;
    }),
    user.onDeleteUserByPhoneNumber
);

module.exports = router;
