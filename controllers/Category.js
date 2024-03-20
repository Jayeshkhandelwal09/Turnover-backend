const User = require("../models/User");
const Category = require("../models/Category");
const { faker } = require("@faker-js/faker");

exports.createCategories = async (req, res, next) => {
  try {
    await Category.deleteMany({});

    const categories = new Array(100).fill(undefined).map(() => ({
      category: faker.commerce.productName(),
    }));

    const createdCategories = await Category.insertMany(categories);

    return res.status(200).json({
      success: true,
      categories: createdCategories,
      message: "Categories created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserCategories = async (req, res) => {
  const { userId, categoryId } = req.params;
  const { isSelected } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (isSelected) {
      // Add category to user's categories array
      if (!user.categories.includes(categoryId)) {
        user.categories.push(categoryId);
      }
    } else {
      // Remove category from user's categories array
      user.categories = user.categories.filter((id) => id !== categoryId);
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
