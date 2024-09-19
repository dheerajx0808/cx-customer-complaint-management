const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/:userId', userController.getUser);
router.post('/:userId', userController.postUser);
router.put('/:userId', userController.putUser);
router.patch('/:userId', userController.patchUser);

module.exports = router;




