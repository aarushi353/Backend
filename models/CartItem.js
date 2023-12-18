const admin = require('firebase-admin');
const db = admin.firestore();

const itemPrices = {
  'Parle-g': 10,
  'Britannia Nutrichoice': 20,
  'Monaco': 10,
  'Oreo': 10,
  'Popcorn': 10,
  'Dairy milk': 10,
  'Nestle chocolate': 10,
  'Bourbon biscuits': 10,
  'Uncle chips': 20,
  'Jimjam': 10,
};

class CartItem {
  static async updateCartItem(userId, itemName) {
    try {
      const userRef = db.collection('users').doc(userId);
      const cartItemRef = userRef.collection('items').doc(itemName);

      const cartItemDoc = await cartItemRef.get();

      if (cartItemDoc.exists) {
        const currentQty = cartItemDoc.data().Qty || 0;
        await cartItemRef.update({ Qty: currentQty + 1 });
      } else {
        const itemPrice = itemPrices[itemName] || 10; 
        await cartItemRef.set({ Qty: 1, price: itemPrice });
      }

      return { status: 'success' };
    } catch (error) {
      console.error(error);
      return { status: 'error', message: error.message };
    }
  }
}

module.exports = CartItem;
