
const { validationResult } = require('express-validator');
const chatRoomModel = require('../models/chatRoom');
const chatMessageModel = require('../models/chatmessages');

const deleteRoomById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const deletedRoomDetails = await chatRoomModel.deleteOne({_id : req.params.roomId});
        const deletedMessagesDetails = await chatMessageModel.deleteMany({chatRoomId : req.params.roomId });
        return res.status(200).json({success : true, deletedRoomDetails, deletedMessagesDetails});

    } catch (error) {
        return res.status(500).json({success : false, error});
    }
};

const deleteMessageById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const deletedMessageDetails = await chatMessageModel.deleteOne({_id : req.params.messageId });
        return res.status(200).json({success : true, deletedMessageDetails});
    } catch (error) {
        return res.status(500).json({success : false, error});
    }
};


module.exports =  { 
    deleteRoomById : deleteRoomById, 
    deleteMessageById : deleteMessageById
};

