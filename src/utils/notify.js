const cron = require('node-cron');
const axios = require('axios');
const { pool, promiseQuery } = require('./database');

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// Funktion zum Senden einer Discord-Nachricht über Webhook
const sendDiscordNotification = async (message) => {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, { content: message });
  } catch (error) {
    console.error('Fehler beim Senden der Discord-Nachricht:', error.message);
  }
};
const checkNotifications = async () => {
  try {
    // Prüfe Produkte mit Benachrichtigungen oder Produkte, die innerhalb der nächsten 3 Tage ablaufen
    const productsQuery = 'SELECT * FROM products WHERE notify = true OR expiration_date BETWEEN NOW() AND NOW() + INTERVAL 3 DAY';
    const products = await promiseQuery(productsQuery);

    for (const product of products) {
      // Prüfe Benachrichtigungsschwelle
      const expirationDate = new Date(product.expiration_date);
      const currentDate = new Date();

      // Prüfe, ob Benachrichtigungsschwelle erreicht ist
      if (product.notify && product.notification_threshold !== 'not_set') {
        const thresholdDate = new Date(expirationDate);
        thresholdDate.setDate(thresholdDate.getDate() - parseInt(product.notification_threshold));
        if (currentDate >= thresholdDate) {
          // Sende Benachrichtigung
          const message = `Benachrichtigung für Produkt: ${product.name}. Schwelle erreicht.`;
          sendDiscordNotification(message);
        }
      }

      // Prüfe, ob Ablaufdatum innerhalb der nächsten 3 Tage liegt
      const threeDaysBeforeExpiration = new Date(expirationDate);
      threeDaysBeforeExpiration.setDate(threeDaysBeforeExpiration.getDate() - 3);
      if (currentDate <= expirationDate && currentDate >= threeDaysBeforeExpiration) {
        // Sende Benachrichtigung
        const message = `Benachrichtigung für Produkt: ${product.name}. Ablaufdatum in den nächsten 3 Tagen.`;
        sendDiscordNotification(message);
      }
    }
  } catch (error) {
    console.error('Fehler beim Prüfen und Senden von Benachrichtigungen:', error.message);
  }
};

// Konfiguriere den Cron-Job, um alle 5 Minuten die Benachrichtigungen zu prüfen
cron.schedule('0 12 * * *', checkNotifications);

// Exportiere eine Funktion, um Benachrichtigungen manuell zu prüfen (z.B., über eine Express-Routen-Anfrage)
exports.checkNotificationsManually = checkNotifications;
