const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/', async (req, res) => {
    const {name, price, description, image, category} = req.body;
    try {
        const newProduct = new Product({name, price, description, image, category});
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) =>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: error.message });
      }
});

router.put('/:id', async (req, res) => {
    const { name, price, description, image, category } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update fields
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.category = category || product.category;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product).status(200);
});


module.exports = router;