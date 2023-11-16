const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAuthenticated = require('../middleware/authValidation');

// Unprotected endpoints
router.post('/', userController.createUser);

// Session validation
router.use(isAuthenticated)

// Protected endpoints 
router.get('/all', userController.getUsers)
router.get('/:id', userController.getUser)
router.patch('/id', userController.updateUser)

module.exports = router