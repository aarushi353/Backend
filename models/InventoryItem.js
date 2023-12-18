const admin = require('firebase-admin');
const db = admin.firestore();

class InventoryItem {
  static async updateInventoryItem(itemName) {
    try {
      const inventoryItemRef = db.collection('inventory').doc(itemName);

      // Get the current quantity from the database
      const inventoryItemDoc = await inventoryItemRef.get();
      let currentQty = 0;

      if (inventoryItemDoc.exists) {
        const data = inventoryItemDoc.data();
        currentQty = data.Qty || 0;
      }

      // Update the quantity by incrementing it
      await inventoryItemRef.set({ Qty: currentQty + 1 });

      return { status: 'success' };
    } catch (error) {
      console.error(error);
      return { status: 'error', message: error.message };
    }
  }
}

module.exports = InventoryItem;
