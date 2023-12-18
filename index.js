// index.js
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./picknpass-11cc5-firebase-adminsdk-7rhdm-5c0ed8a5fd.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://picknpass-11cc5-default-rtdb.firebaseio.com',
});

const db = admin.firestore();
const app = express();
const port = 3000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
const cartItemRoutes = require('./routes/cartItemRoutes');
const inventoryItemRoutes = require('./routes/inventoryItemRoutes');

app.use('/user', userRoutes);
app.use('/cartItem', cartItemRoutes);
app.use('/inventoryItem', inventoryItemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
