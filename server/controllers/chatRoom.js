const chatRoomModel = require('../models/chatRoom');
const chatMessageModel = require('../models/chatmessages');
const userModel = require('../models/user');
const { validationResult } = require('express-validator');

const getRecentChatRooms = async (req, res) => {
    try {
        const chatRooms = await chatRoomModel.getRecentChatRooms();
        return res.status(200).json({success : true, chatRooms});
    } catch (error) {
        return res.status(500).json({success : false, error :error});
    }
};
const getRecentConversationByChatRoomId = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const chatRoom = await chatRoomModel.getChatRoomByRoomId(req.params.roomId);
        const users = await userModel.model.getUserByIds(chatRoom.userIds);
        const options = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10
        };
        const recentConversations = await chatMessageModel.getRecentConversationByChatRoomId(req.params.roomId, options);
        return res.status(200).json({
            success: true,
            recentConversations,
            users,
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};
const initiate = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const { userIds } = req.body;
        const { userId: chatRoomInitiator } = req;
        const allUserIds = [...userIds, chatRoomInitiator];
        const chatRoom = await chatRoomModel.initiateChatRoom(allUserIds, chatRoomInitiator);
        return res.status(200).json({ success: true, chatRoom });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};
const postMessage = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const messageObject = {
            messageText: req.body.messageText,
        };
        const chatRoomId = req.body.chatRoomId;
        const currentLoggedUser = req.userId;
        const post = await chatMessageModel.createPostInChatRoom(chatRoomId, messageObject, currentLoggedUser);
        global.io.sockets.in(chatRoomId).emit('new message', { message: post });
        return res.status(200).json({ success: true, post });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};
const markConversationReadByChatRoomId = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const chatRoomId = req.params.roomId;
        const currentLoggedUser = req.userId;
        const result = await chatMessageModel.markConversationReadByChatRoomId(chatRoomId, currentLoggedUser);
        return res.status(200).json({success : true, result});
    } catch (error) {
        return res.status(500).json({success : false, error : error});
    }
};

module.exports = {
    getRecentChatRooms: getRecentChatRooms,
    getRecentConversationByChatRoomId: getRecentConversationByChatRoomId,
    initiate: initiate,
    postMessage: postMessage,
    markConversationReadByChatRoomId: markConversationReadByChatRoomId
};

