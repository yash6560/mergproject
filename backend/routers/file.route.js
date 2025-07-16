const express = require('express');
const {authenticatUser} = require('../middleware/middlware');
const upload = require('../utils/multerForFiles');
const { fileUpload } = require('../controllers/file.Controller');

const router = express.Router();

router.post('/upload', authenticatUser, upload.single('file'), fileUpload);

module.exports = router;