const admin = require('firebase-admin');
const db = admin.firestore();

class User {
  static async saveUserInfo(userId, name) {
    await db.collection('users').doc(userId).set({ name });
  }
}

module.exports = User;
