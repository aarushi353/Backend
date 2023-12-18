// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Initialize global variables
let user_logged_in = null;
let user_logged_in_id = null;

// Middleware to update global variables
router.use((req, res, next) => {
  const { name, userId } = req.body;

  // Update global variables if name and userId are present in the request body
  if (name) {
    user_logged_in = name;
  }
  if (userId) {
    user_logged_in_id = userId;
  }

  next();
});

router.post('/saveUserInfo', async (req, res) => {
  try {
    const { userId, name } = req.body;
    await db.collection('users').doc(userId).set({ name });

    res.json({ status: 'success', message: `User ${name} information updated successfully.` });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Add more user-related routes if needed

module.exports = { router, user_logged_in, user_logged_in_id };
