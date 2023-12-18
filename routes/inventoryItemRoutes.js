// routes/inventoryItemRoutes.js
const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');

router.post('/updateInventoryItem', async (req, res) => {
  try {
    const { itemName } = req.body;
    const result = await InventoryItem.updateInventoryItem(itemName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
