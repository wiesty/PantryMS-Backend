const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes');
const notifyRoutes = require('./routes/notificationRoutes');
require('dotenv').config();

app.use(cors());

// Middleware für JSON-Requests
app.use(bodyParser.json());

app.use('/notifications', notifyRoutes);

// Routen für Produkte und Einkaufslisten
app.use('/api', productRoutes);
app.use('/api', shoppingListRoutes);

// Start des Servers
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
