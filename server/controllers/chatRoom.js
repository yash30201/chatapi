const chatRoomModel = require('../models/chatRoom');
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

