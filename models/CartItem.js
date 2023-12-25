const admin = require('firebase-admin');
const db = admin.firestore();

let userid = null;

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
  static async updateCartItem(itemName, Qty) {
    try {
      const usersCollection = db.collection('users');
      const querySnapshot = await usersCollection.where('isLoggedIn', '==', true).get();

      if (!querySnapshot.empty) {
        const loggedInUser = querySnapshot.docs[0];
        userid = loggedInUser.id; 
      }

      if (!userid) {
        return { status: 'error', message: 'No user is currently logged in.' };
      }

      const userRef = db.collection('cart').doc(userid);
      const userDoc = await userRef.get();
      const existingItems = userDoc.data()?.items || [];

      const existingItemIndex = existingItems.findIndex(item => item.itemName === itemName);

      if (existingItemIndex !== -1) {
        existingItems[existingItemIndex].Qty += Qty;
      } else {
        const itemPrice = itemPrices[itemName] || 10;
        existingItems.push({ itemName, price: itemPrice, Qty });
      }
      await userRef.set({ items: existingItems }, { merge: true });

      return { status: 'success', items: existingItems };
    } catch (error) {
      console.error(error);
      return { status: 'error', message: error.message };
    }
  }
}

module.exports = CartItem;
