const mongoose = require('mongoose');
const {v4} = require('uuid');


const USER_TYPES = ['CONSUMER', 'DEVELOPER'];

const userSchema = new mongoose.Schema(
    {
        _id : {
            type : String, 
            default : () => v4().replace(/\-/g, ""),
        }, 
        firstName : String,
        lastName : String, 
        phoneNumber :String,
        userType : String,
    },
    {
        timestamps : true,
        collection : 'users',
    }
);

userSchema.statics.createUser = async function(
    firstName,
    lastName, 
    phoneNumber, 
    userType
){
    try{
        const userTemp = await this.findOne({ phoneNumber : phoneNumber});
        if(userTemp !== null) throw({message : "This phone number is already in use"});
        const user = await this.create({firstName, lastName, phoneNumber, userType});
        return user;
    } catch(err){
        throw err;
    }
}

userSchema.statics.getUserByIds = async function(id){
    try{
        const user = await this.findOne({_id :id});
        if(!user) throw({message : 'No such user exists with this id'});
        return user;
    } catch(err){
        throw err;
    }
}

userSchema.statics.getUserByIds = async function(userIds){
    try {
        const users = await this.find({
            _id : {$in : userIds}
        });
        return users;
    } catch (err) {
        throw err;
    }
}

userSchema.statics.getUserByPhoneNumber = async function(phoneNumber){
    try{
        const user = await this.findOne({ phoneNumber : phoneNumber});
        if(!user) throw({message : 'No such user exists with this phone number'});
        return user;
    } catch(err){
        throw err;
    }
}

userSchema.statics.getUsers = async function(){
    try{
        const users = await this.find();
        return users;
    } catch(err){
        throw err;
    }
}

userSchema.statics.deleteUserById = async function(id){
    try{
        const result = await this.deleteOne({ _id : id});
        return result;
    } catch(err) {
        throw err;
    }
}

userSchema.statics.deleteUserByPhoneNumber = async function(phoneNumber){
    try{
        const result = await this.deleteOne({ phoneNumber : phoneNumber});
        return result;
    } catch(err) {
        throw err;
    }
}

const model = mongoose.model("user", userSchema);



module.exports = {
    USER_TYPES : USER_TYPES,
    model : model
}