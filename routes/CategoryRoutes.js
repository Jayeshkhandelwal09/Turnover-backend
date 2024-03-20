// Import the required modules
const express = require('express');
const router = express.Router();

// Import the required controllers and middleware functions
const { getAllCategories, updateUserCategories } = require('../controllers/Category');

// Route for getting categories
router.get('/categories', getAllCategories);
// Route for updating user schema when user select and deselects the categories
router.put('/users/:userId/categories', updateUserCategories);

module.exports = router;