const express = require('express');
const deleteController = require('package');

const router = express.Router();

router
    .delete('/room/:roomId', deleteController.deleteRoomById)
    .delete('/message/:messageId', deleteController.deleteMessageById);

export default router;
