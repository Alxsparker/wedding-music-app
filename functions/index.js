// Si functions est déjà déclaré ailleurs dans le fichier, assurez-vous de ne pas le redéclarer
// et d'utiliser la déclaration existante.

const functions = require('firebase-functions');
const logger = require('firebase-functions/logger');

// Exemple d'utilisation de onRequest et logger
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
  logger.info("HelloWorld function called"); // Exemple d'utilisation de logger
});
