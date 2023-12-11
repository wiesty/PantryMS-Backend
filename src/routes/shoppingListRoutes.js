const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');
const { validateShoppingListItem } = require('../middlewares/validation');

// CRUD-Routen für die Einkaufsliste
router.post('/shopping-list', validateShoppingListItem, shoppingListController.addItemToShoppingList);
router.put('/shopping-list/:id', validateShoppingListItem, shoppingListController.editItemInShoppingList);
router.delete('/shopping-list/:id', shoppingListController.removeItemFromShoppingList);
router.get('/shopping-list', shoppingListController.getAllItemsInShoppingList);

module.exports = router;
