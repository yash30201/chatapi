const express = require('express');
const chatRoom = require('../controllers/chatRoom');
const {body} = require('express-validator');


const router = express.Router();

router.get('/', chatRoom.getRecentChatRooms);


//  To implement validation for userid(uuidv4)
router.post(
    '/initiate', 
    body('userIds.*').notEmpty().isString(),
    body('userIds').isArray({min : 1}).custom(userIds => {
        let userIdsCopy = userIds.slice().sort();
        let len = userIds.length;
        let notValid = false;
        for(let i = 0 ; i < len - 1 ; i++){
            if(userIdsCopy[i] == userIdsCopy[i+1]){
                notValid = true;
                break;
            }
        }
        if(notValid) throw new Error('Some userIds are same');
        return true;
    }),
    chatRoom.initiate
);


router.post(
    '/message', 
    body('chatRoomId').notEmpty().isString(),
    body('messageText').notEmpty(),
    chatRoom.postMessage
);
router.put('/:roomId/mark-read', chatRoom.markConversationReadByChatRoomId);
router.get('/:roomId', chatRoom.getRecentConversationByChatRoomId);
module.exports = router;
