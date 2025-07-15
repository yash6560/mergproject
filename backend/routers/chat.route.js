const express = require('express');
const {getUsers, sendMessage, getMessage} = require('../controllers/chat.controller');
const {authenticatUser} = require('../middleware/middlware');
const upload = require('../utils/multer');

const router = express.Router();

router.post('/',authenticatUser, getUsers);
router.post('/send',authenticatUser, upload.single('image'), sendMessage);
router.post('/get-chat',authenticatUser, getMessage);

module.exports = router;