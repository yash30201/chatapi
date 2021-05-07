const { validationResult } = require('express-validator');
const authModel = require('../models/auth');
const jwt = require('jsonwebtoken');
const {jwt_SECRET_KEY} = require('../config/config');


const onloginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success : false,  errors: errors.array() });
        }
        const {phoneNumber, password} = req.body;
        const loginAuth = await authModel.loginUser(phoneNumber, password);
        const payload = {
            user_id : loginAuth._id,
        }
        const authToken = jwt.sign(payload, jwt_SECRET_KEY);
        res.status(200).json({success : true, authToken : authToken});
    } catch (err) {
        res.status(400).json({success : false, error : err});
    }
};

const onsignupUser = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {firstName, lastName, phoneNumber, password} = req.body;
        const signupAuth = await authModel.signupUser(firstName, lastName, phoneNumber, password);
        res.status(200).json({success : true, user : signupAuth});
    } catch(err){
        res.status(400).json({success : false, error : err});
    }
};

module.exports =  { 
    onloginUser : onloginUser, 
    onsignupUser : onsignupUser
};

