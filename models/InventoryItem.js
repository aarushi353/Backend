// models/InventoryItem.js
const admin = require('firebase-admin');
const db = admin.firestore();

class InventoryItem {
  static async updateInventoryItem(itemName, Qty) {
    try {
      const inventoryItemRef = db.collection('inventory').doc(itemName);

      // Get the current inventory item
      const inventoryItemDoc = await inventoryItemRef.get();

      // Extract the current quantity (if it exists)
      let currentQty = 0;
      if (inventoryItemDoc.exists) {
        const data = inventoryItemDoc.data();
        currentQty = data.Qty || 0;
      }

      await inventoryItemRef.set({ Qty: currentQty - Qty });

      return { status: 'success' };
    } catch (error) {
      console.error(error);
      return { status: 'error', message: error.message };
    }
  }
}

module.exports = InventoryItem;
