const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, ping, signInUser, getUser } = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/signin-user', signInUser);
router.get('/user/:userId', getUser)
router.post('/ping', ping);

module.exports = router;
