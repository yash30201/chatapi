const express = require('express');
const user = require('../controllers/user');

const router = express.Router();

router.get('/', user.onGetAllUsers);
router.post('/', user.onCreateUser);
router.get('/:id', user.onGetUserById);
router.get('/:mail', user.onGetUserByEmail);
router.delete('/:id', user.onDeleteUserById);

export default router;
