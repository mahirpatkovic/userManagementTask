const express = require('express');
const createUserController = require('../controllers/userController/createUser');
const getUserController = require('../controllers/userController/getUsers');
const updateUserController = require('../controllers/userController/updateUser');
const removeUserController = require('../controllers/userController/removeUser');
const router = express.Router();

router.post('/', createUserController);
router.get('/', getUserController.getUsers);
router.get('/:id', getUserController.getUser);

router.patch('/updateUser', updateUserController);
router.delete('/:userId', removeUserController);
module.exports = router;
