const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/saveUserInfo', async (req, res) => {
  try {
    const { userId, name } = req.body;
    await User.saveUserInfo(userId, name);
    res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
