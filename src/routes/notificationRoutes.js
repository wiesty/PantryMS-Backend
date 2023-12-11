const express = require('express');
const router = express.Router();
const notify = require('../utils/notify');

// Route zum manuellen Prüfen und Senden von Benachrichtigungen
router.get('/check-notifications', (req, res) => {
  notify.checkNotificationsManually();
  res.json({ message: 'Benachrichtigungen manuell überprüft und gesendet.' });
});

module.exports = router;
