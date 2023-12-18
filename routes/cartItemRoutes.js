// routes/cartItemRoutes.js
const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

module.exports = function(user_logged_in_id) {
  router.post('/updateCartItem', async (req, res) => {
    try {
      const { itemName, Qty } = req.body;
      const result = await CartItem.updateCartItem(user_logged_in_id, itemName, Qty);
      res.json(result);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  return router;
};
