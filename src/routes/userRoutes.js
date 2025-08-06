const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, ping, signInUser } = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/signin-user', signInUser);
router.post('/ping', ping);

module.exports = router;
