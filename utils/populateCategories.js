const faker = require('faker');
const Category = require('../models/Category');

async function seedCategories() {
  try {
    await Category.deleteMany({});

    const categories = Array.from({ length: 100 }, () => ({
      name: faker.commerce.department()
    }));

    await Category.insertMany(categories);

    console.log('Categories seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();
