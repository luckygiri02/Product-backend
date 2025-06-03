const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  category: String,
  inStock: Boolean,
  image: String,
});


module.exports = mongoose.model("Product", productSchema);