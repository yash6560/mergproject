const express = require('express');
const { userSignup, userLogin, userLogout, authMe } = require('../controllers/auth.controller');
const {authenticatUser} = require('../middleware/middlware');

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.get('/me', authenticatUser, authMe);

module.exports = router;