
const { validationResult } = require('express-validator');

const deleteRoomById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
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
    } catch (error) {
        return res.status(500).json({success : false, error});
    }
};


module.exports =  { 
    deleteRoomById : deleteRoomById, 
    deleteMessageById : deleteMessageById
};

