const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

router.post('/updateCartItem', async (req, res) => {
  try {
    const { userId, itemName } = req.body;
    const result = await CartItem.updateCartItem(userId, itemName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
