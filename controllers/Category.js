const User = require("../models/User");
const Category = require("../models/Category");

exports.getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.updateUserCategories = async (req, res) => {
    const { userId, categoryId, isSelected } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (isSelected) {
        // Add category to user's categories array
        if (!user.categories.includes(categoryId)) {
          user.categories.push(categoryId);
        }
      } else {
        // Remove category from user's categories array
        user.categories = user.categories.filter(id => id !== categoryId);
      }
  
      await user.save();
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };