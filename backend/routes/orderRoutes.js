const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


router.post('/', async (req, res) => {
  const { user, orderItems, paymentMethod, totalPrice } = req.body;
  try {
    const newOrder = new Order({ user, orderItems, paymentMethod, totalPrice });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
     const order = await Order.findById(req.params.id);
     if (!order) {
       return res.status(404).json({ message: 'Order not found' });
     }
     res.status(200).json(order);
    } catch (error) {
     console.error('Error fetching order:', error);
     res.status(500).json({ error: error.message });
    }
 });
 

module.exports = router;
