// models/InventoryItem.js
const admin = require('firebase-admin');
const db = admin.firestore();

class InventoryItem {
  static async updateInventoryItem(itemName, Qty) {
    try {
      const inventoryItemRef = db.collection('inventoryItems').doc(itemName);

      const inventoryItemDoc = await inventoryItemRef.get();

      if (inventoryItemDoc.exists) {
        await inventoryItemRef.update({ Qty: Qty });
      } else {
        await inventoryItemRef.set({ Qty: Qty });
      }

      return { status: 'success' };
    } catch (error) {
      console.error(error);
      return { status: 'error', message: error.message };
    }
  }
}

module.exports = InventoryItem;
