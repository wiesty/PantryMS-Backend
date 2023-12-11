const { body, validationResult } = require('express-validator');

const validateProduct = [
  body('name').notEmpty().withMessage('Produktname darf nicht leer sein.'),
  body('category').notEmpty().withMessage('Kategorie darf nicht leer sein.'),
  body('quantity').notEmpty().withMessage('Menge darf nicht leer sein.'),
  body('unit_type').notEmpty().withMessage('Einheitentyp darf nicht leer sein.'),
  body('expiration_date').notEmpty().isISO8601().withMessage('Ungültiges Ablaufdatum.'),
  body('notify').isBoolean().withMessage('Benachrichtigungsstatus muss ein boolescher Wert sein.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateShoppingListItem = [
  body('name').notEmpty().withMessage('Name darf nicht leer sein.'),
  body('quantity').notEmpty().withMessage('Menge darf nicht leer sein.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateProduct, validateShoppingListItem };
