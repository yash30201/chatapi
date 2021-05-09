const mongoose = require('mongoose');
const {v4 : uuidv4} = require('uuid');

const chatRoomSchema = new mongoose.Schema(
    {
        _id : {
            type : String, 
            default : () => uuidv4().replace(/\-/g, ""),
        },
        userIds : Array,
        chatRoomInitiator : String
    },
    {
        timestamps : true,
        collection : 'rooms'
    }
);

chatRoomSchema.statics.initiateChatRoom = async function(
    userIds, chatRoomInitiator
){
    try {
        const availableChatRoom = await this.findOne({
            userIds : {
                $size : userIds.length,
                $all : [...userIds] ,    
            }
        });

        if(availableChatRoom){
            return {
                isNew : false,
                message : 'retrieving an old chat room',
                chatRoomId : availableChatRoom._id,
            };
        }

        const newChatRoom = await this.create({userIds, chatRoomInitiator});
        return {
            isNew : true, 
            message : 'creating a new room',
            chatRoomId : newChatRoom._id
        };
    } catch (err) {
        throw err;
    }
};

const model = mongoose.model('room', chatRoomSchema);

module.exports = model;