const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MESSAGE_TYPES = {
    TYPE_TEXT: "text",
};

const readByRecipientSchema = new mongoose.Schema(
    {
        _id : false,
        readByUserId: String,
        readAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: false }
);

const chatMessageSchema = new mongoose.Schema(
    {
        _id : {
            type : String,
            default : () => uuidv4().replace(/\-/g, ""),
        },
        chatRoomId : String,
        message : mongoose.Schema.Types.Mixed,
        type : {
            type : String,
            default : () => MESSAGE_TYPES.TYPE_TEXT,
        },
        postedByUser : String,
        readByRecipients : [readByRecipientSchema],
    },
    {
        timestamps : true,
        collection : "chatmessages"
    }
);

chatMessageSchema.statics.createPostInChatRoom = async function(
    chatRoomId,
    message,
    postedByUser
){
    try {
        const post = await this.create({
            chatRoomId,
            message,
            postedByUser,
            readByRecipients : [{ readByUserId : postedByUser}]
        });

        const aggregate = await this.aggregate([
            { $match : {_id : post._id}},
            {
                $lookup : {
                    from : 'users',
                    localField : 'postedByUser',
                    foreignField : '_id',
                    as : 'postedByUser',
                }
            },
            { $unwind : '$postedByUser'},
            {
                $lookup : {
                    from : 'rooms',
                    localField : 'chatRoomId',
                    foreignField : '_id',
                    as : 'chatRoomId',
                }
            },
            { $unwind : '$chatRoomId'},
            { $unwind : '$chatRoomId.userIds'},
            {
                $lookup : {
                    from : 'users',
                    localField : 'chatRoomId.userIds',
                    foreignField : '_id',
                    as : 'chatRoomId.userIds',
                }
            },
            { $unwind : '$chatRoomId.userIds'},
            {
                $group : {
                    _id : '$_id',
                    chatRoomId : {$last : '$chatRoomId._id'},
                    message : {$last : '$message'},
                    type : {$last : '$type'},
                    postedByUser : {$last : '$postedByUser'},
                    chatRoomUsers : {$addToSet : '$chatRoomId.userIds'},
                    readByRecipients : {$last : '$readByRecipients'},
                    createdAt : {$last : '$createdAt'},
                    updatedAt : {$last : '$updatedAt'},
                },
            }
        ]);
        return aggregate;
        // return post;
    } catch (err) {
        throw err;
    }
}

chatMessageSchema.statics.getRecentConversationByChatRoomId = async function(chatRoomId, options){
    try {
        const recentConversations = await this.aggregate([
            { $match : {chatRoomId} },
            { $sort : {createdAt : -1}},
            {
                $lookup : {
                    from : 'users',
                    localField : 'postedByUser',
                    foreignField : '_id',
                    as : 'postedByUser'
                }
            },
            { $unwind : '$postedByUser'},
            { $skip : options.page * options.limit},
            { $limit : options.limit},
            { $sort : {createdAt : 1}},
        ]);
         
        return {recentConversations};
    } catch (err) {
        throw err;
    }
}

chatMessageSchema.statics.markConversationReadByChatRoomId = async function(chatRoomId, currentLoggedUser){
    try {
        const result = await this.updateMany(
            {
                chatRoomId,
                'readByRecipients.readByUserId' : { $ne : currentLoggedUser}
            },
            {
                $addToSet : {
                    readByRecipients : {readByUserId : currentLoggedUser}
                }
            },
            {
                multi : true
            }
        );
        return result;
    } catch (err) {
        throw err;
    }
}


const model = mongoose.model("chatmessage", chatMessageSchema);
module.exports = model;