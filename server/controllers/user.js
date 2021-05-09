
const usermodel = require('../models/user');
const { validationResult } = require('express-validator');

const onCreateUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success : false, errors: errors.array() });
        }
        const { firstName, lastName, phoneNumber, userType } = req.body;
        const user = await usermodel.model.createUser(firstName, lastName, phoneNumber, userType);
        return res.status(200).json({ success: true, user: user });
    } catch (error) {
        return res.status(500).json({ success: false, error: error });
    }
};


const onGetAllUsers = async (req, res) => {
    try{
        const users = await usermodel.model.getUsers();
        return res.status(200).json({success : true, users : users});
    } catch(err){
        return res.status(500).json({success :false, error : err});
    }
};
const onGetUserById = async (req, res) => {
    try {
        const user = await usermodel.model.getUserById(req.params.id);
        return res.status(200).json({ success: true, user: user });
    } catch(err){
        return res.status(500).json( {success: false , error : err});
    }
}
const onGetUserByPhoneNumber = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success : false, errors: errors.array() });
        }
        const user = await usermodel.model.getUserByPhoneNumber(req.params.number);
        return res.status(200).json({ success: true, user: user });
    } catch(err){
        return res.status(500).json( {success: false , error : err});
    }
}
const onDeleteUserById = async (req, res) => {
    try{
        const result = await usermodel.model.deleteUserById(req.params.id);
        return res.status(200).json({success : true, message : result});
    } catch(err){
        res.status(500).json({success : false, error : err});
    }
}

const onDeleteUserByPhoneNumber = async(req, res) =>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success : false,  errors: errors.array() });
        }
        const result = await usermodel.model.deleteUserByPhoneNumber(req.params.number);
        return res.status(200).json({success : true, message : result});
    } catch(err){
        res.status(500).json({success : false, error : err});
    }
}

module.exports = {
    onGetAllUsers: onGetAllUsers,
    onCreateUser: onCreateUser,
    onGetUserById: onGetUserById,
    onGetUserByPhoneNumber: onGetUserByPhoneNumber,
    onDeleteUserById: onDeleteUserById,
    onDeleteUserByPhoneNumber: onDeleteUserByPhoneNumber
};