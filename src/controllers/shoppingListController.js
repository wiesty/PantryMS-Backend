const { pool, promiseQuery } = require('../utils/database');

const shoppingListController = {
  // Hinzufügen eines neuen Eintrags zur Einkaufsliste
  addItemToShoppingList: async (req, res) => {
    const { name, quantity } = req.body;
    const sql = 'INSERT INTO shopping_list (name, quantity) VALUES (?, ?)';
    const values = [name, quantity];

    try {
      await promiseQuery(sql, values);
      res.status(201).json({ message: 'Eintrag erfolgreich zur Einkaufsliste hinzugefügt.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  },

  // Bearbeiten eines vorhandenen Eintrags in der Einkaufsliste
  editItemInShoppingList: async (req, res) => {
    const itemId = req.params.id;
    const { name, quantity } = req.body;
    const sql = 'UPDATE shopping_list SET name=?, quantity=? WHERE item_id=?';
    const values = [name, quantity, itemId];

    try {
      await promiseQuery(sql, values);
      res.json({ message: 'Eintrag in der Einkaufsliste erfolgreich aktualisiert.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  },

  // Löschen eines Eintrags aus der Einkaufsliste
  removeItemFromShoppingList: async (req, res) => {
    const itemId = req.params.id;
    const sql = 'DELETE FROM shopping_list WHERE item_id=?';

    try {
      await promiseQuery(sql, [itemId]);
      res.json({ message: 'Eintrag aus der Einkaufsliste erfolgreich gelöscht.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  },

  // Abrufen aller Einträge aus der Einkaufsliste
  getAllItemsInShoppingList: async (req, res) => {
    const sql = 'SELECT * FROM shopping_list';

    try {
      const results = await promiseQuery(sql);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  },
};

module.exports = shoppingListController;
