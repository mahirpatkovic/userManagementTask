const express = require('express');
const createPermissionController = require('../controllers/permissionController/createPermission');
const getPermissionController = require('../controllers/permissionController/getPermissions');
const updatePermissionController = require('../controllers/permissionController/updatePermission');
const deletePermissionController = require('../controllers/permissionController/deletePermission');
const router = express.Router();

router.post('/', createPermissionController);
router.get('/', getPermissionController.getAllPermissions);
router.get('/:userId', getPermissionController.getUsersPermissions);
router.patch('/updatePermission', updatePermissionController);
router.delete('/:id', deletePermissionController);

module.exports = router;
