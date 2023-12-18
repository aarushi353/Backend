const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

let user_logged_in = null;
let user_logged_in_id = null;

router.post('/saveUserInfo', async (req, res) => {
  try {
    const { userId, name } = req.body;    
    if (name) {
      user_logged_in = name;
    }
    if (userId) {
      user_logged_in_id = userId;
    }

    res.json({ status: 'success', message: `User ${user_logged_in} information updated successfully.` });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/checkVariables', (req, res) => {
  res.json({
    user_logged_in,
    user_logged_in_id,
  });
});

module.exports = { router, user_logged_in, user_logged_in_id };