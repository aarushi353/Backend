// routes/inventoryItemRoutes.js
const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');

router.post('/updateInventoryItem', async (req, res) => {
  try {
    const { itemName, Qty } = req.body; // Assuming itemName is the document name
    const result = await InventoryItem.updateInventoryItem(itemName, Qty);
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
