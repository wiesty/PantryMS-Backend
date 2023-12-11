const { pool, promiseQuery } = require('../utils/database');

const productController = {
  // Hinzufügen eines neuen Produkts
  addProduct: async (req, res) => {
    const { name, category, quantity, unit_type, expiration_date, notify, notification_threshold } = req.body;
    const sql = 'INSERT INTO products (name, category, quantity, unit_type, expiration_date, notify, notification_threshold) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [name, category, quantity, unit_type, expiration_date, notify, notification_threshold];

    try {
      await promiseQuery(sql, values);
      res.status(201).json({ message: 'Produkt erfolgreich hinzugefügt.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  },

  // Bearbeiten eines vorhandenen Produkts
  editProduct: async (req, res) => {
    const productId = req.params.id;
    const { name, category, quantity, unit_type, expiration_date, notify, notification_threshold } = req.body;
    const sql = 'UPDATE products SET name=?, category=?, quantity=?, unit_type=?, expiration_date=?, notify=?, notification_threshold=? WHERE product_id=?';
    const values = [name, category, quantity, unit_type, expiration_date, notify, notification_threshold, productId];

    try {
      await promiseQuery(sql, values);
      res.json({ message: 'Produkt erfolgreich aktualisiert.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  },

  // Löschen eines vorhandenen Produkts
  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    const sql = 'DELETE FROM products WHERE product_id=?';

    try {
      await promiseQuery(sql, [productId]);
      res.json({ message: 'Produkt erfolgreich gelöscht.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  },

  // Abrufen aller Produkte
  getAllProducts: async (req, res) => {
    const sql = 'SELECT * FROM products';

    try {
      const results = await promiseQuery(sql);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  },

  // Abrufen eines einzelnen Produkts
  getProductById: async (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE product_id=?';

    try {
      const results = await promiseQuery(sql, [productId]);
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Produkt nicht gefunden.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  },
};

module.exports = productController;
