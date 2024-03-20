const Category = require("../models/Category");
const { faker } = require("@faker-js/faker");

// Import the required modules
const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    await Category.deleteMany({});

    const cat = new Array(100)
      .fill(undefined)
      .map(el=>({ category: faker.commerce.product() }));

    await Category.insertMany(cat);

    return res.status(200).json({
      success: true,
      cat,
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
