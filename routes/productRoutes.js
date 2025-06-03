const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.post('/', async (req, res) => {
  try {
    const { name, price, category, inStock, image } = req.body;
    const product = new Product({ name, price, category, inStock, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(400).json({ message: 'Error creating product' });
  }
});
// Update product - only admin
router.put('/:id', async (req, res) => {
  const { role } = req.body;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error updating product' });
  }
});

// Delete product - only admin
router.delete('/:id', async (req, res) => {
  const { role } = req.body;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting product' });
  }
});

// Get all products - open for all (no role check)
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get product by id - open for all (no role check)
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

module.exports = router;
