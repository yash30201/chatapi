const express = require('express');
const { body } = require('express-validator');
const auth = require('../controllers/auth');

const router = express.Router();

router.post(
    '/login',
    body('phoneNumber').isNumeric().custom(value => {
        if (value.length !== 10) {
            throw new Error('Invalid phone number');
        }
        return true;
    }),
    body('password').isStrongPassword(),
    auth.onloginUser
);

router.post(
    '/signup',
    body('firstName').isString().notEmpty().toLowerCase(),
    body('lastName').isString().notEmpty().toLowerCase(),
    body('phoneNumber').isNumeric().custom(value => {
        if (value.length !== 10) {
            throw new Error('Invalid phone number');
        }
        return true;
    }),
    body('password').isStrongPassword(),
    auth.onsignupUser
);

module.exports = router;

// { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
