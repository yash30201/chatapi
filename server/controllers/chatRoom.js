const chatRoomModel = require('../models/chatRoom');
const chatMessageModel = require('../models/chatmessages');
const { validationResult } = require('express-validator');

const getRecentChatRooms = async (req, res) => {

};
const getRecentConversationByChatRoomId = async (req, res) => {

};
const initiate = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success : false, errors: errors.array() });
        }
        const {userIds} = req.body;
        const {userId : chatRoomInitiator} = req;
        const allUserIds = [...userIds, chatRoomInitiator];
        const chatRoom = await chatRoomModel.initiateChatRoom(allUserIds, chatRoomInitiator);
        return res.status(200).json({success : true, chatRoom});
    } catch (err) {
        return res.status(500).json({success: false, error : err});
    }
};
const postMessage = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success : false, errors: errors.array() });
        }
        const messageObject = {
            messageText : req.body.messageText,
        };
        const chatRoomId = req.body.chatRoomId;
        const currentLoggedUser = req.userId;
        const post = await chatMessageModel.createPostInChatRoom(chatRoomId, messageObject, currentLoggedUser);
        global.io.sockets.in(chatRoomId).emit('new message', {message : post});
        return res.status(200).json({success : true, post});
    } catch (err) {
        return res.status(500).json({success : false, error : err});
    }
};
const markConversationReadByChatRoomId = async (req, res) => {

};

module.exports =  { 
    getRecentChatRooms : getRecentChatRooms,
    getRecentConversationByChatRoomId : getRecentConversationByChatRoomId,
    initiate : initiate,
    postMessage : postMessage,
    markConversationReadByChatRoomId : markConversationReadByChatRoomId
};

