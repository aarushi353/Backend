// models/CartItem.js
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
        // Take the first user from the result (you may want to add additional logic if needed)
        const loggedInUser = querySnapshot.docs[0];
        userid = loggedInUser.id; // Document ID is the userId
      }

      if (!userid) {
        return { status: 'error', message: 'No user is currently logged in.' };
      }

      const userRef = db.collection('cart').doc(userid);

      // Retrieve existing items array or initialize as an empty array
      const userDoc = await userRef.get();
      const existingItems = userDoc.data()?.items || [];

      // Check if the item already exists in the array
      const existingItemIndex = existingItems.findIndex(item => item.itemName === itemName);

      if (existingItemIndex !== -1) {
        // Update quantity if the item already exists
        existingItems[existingItemIndex].Qty += Qty;
      } else {
        // Add a new item to the array
        const itemPrice = itemPrices[itemName] || 10;
        existingItems.push({ itemName, price: itemPrice, Qty });
      }

      // Save the updated items array to the user document
      await userRef.set({ items: existingItems }, { merge: true });

      return { status: 'success', items: existingItems };
    } catch (error) {
      console.error(error);
      return { status: 'error', message: error.message };
    }
  }
}

module.exports = CartItem;
