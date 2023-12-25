const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

module.exports = function() {
  router.post('/updateCartItem', async (req, res) => {
    try {
      const { itemName, Qty } = req.body;
      const result = await CartItem.updateCartItem(itemName, Qty);
      res.json(result);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  return router;
};
