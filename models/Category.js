const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categories: {
    type: [String], // An array of strings to hold category names
    default: ['PC & Phone Accessories', 'Smartwatches', 'Headphones', 'Other'], // Initial default categories
  },
});

module.exports = mongoose.model('Category', categorySchema);
