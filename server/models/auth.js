const mongoose = require('mongoose');
const {v4} = require('uuid');
const userModel = require('./user');
const bcrypt = require('bcryptjs');


const authSchema = new mongoose.Schema(
    {
        _id : {
            type : String, 
            default : () => v4().replace(/\-/g, ""),
        },
        phoneNumber : String,
        hash : String,
    },
    {
        timestamps : true,
        collection : 'auths'
    }
);



authSchema.statics.loginUser = async function(phoneNumber,password){
    try{
        const userTemp = await this.findOne({phoneNumber : phoneNumber});
        if(userTemp === null) throw({message : 'No user with this phone number exists'});
        const tempHash = userTemp.hash;
        if(tempHash === null) throw({message : "The hash string doesn't exists", hash : tempHash});
        const valid = await bcrypt.compare(password, tempHash);
        if(!valid) throw ({message : 'Password is incorrect'});
        return userTemp;
    } catch(err){
        throw err;
    }
}

authSchema.statics.signupUser = async function(
    firstName,
    lastName,
    phoneNumber,
    password,
){
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Creating user in the users collection
        const userType = 'CONSUMER';
        const user = await userModel.model.createUser(firstName, lastName, phoneNumber, userType);
        // This will give error if this phoneNumber already exists, therefore creating authUser after this
        const _id = user._id;
        const userAuth = await this.create({_id, phoneNumber, hash});
        return {_id : userAuth._id, phoneNumber : userAuth.phoneNumber};
    } catch (error) {
        throw error;
    }
}


const authModel = mongoose.model('auth', authSchema);

module.exports = authModel;