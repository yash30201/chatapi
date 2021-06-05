const express = require('express');
const deleteController = require('../controllers/delete');
const {param } = require('express-validator');

const router = express.Router();

router.delete(
    '/room/:roomId',
    param('roomId').notEmpty().isAlphanumeric(), 
    deleteController.deleteRoomById
);

router.delete(
    '/message/:messageId', 
    param('messageId').notEmpty().isAlphanumeric(), 
    deleteController.deleteMessageById
);

module.exports = router;
