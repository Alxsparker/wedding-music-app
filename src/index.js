const functions = require('firebase-functions');
const logger = require('firebase-functions/logger');

// Exemple d'utilisation de onRequest
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
  logger.info("HelloWorld function called");  // Exemple d'utilisation de logger
});
/* eslint-disable no-unused-vars */
const functions = require('firebase-functions');
const onRequest = functions.https.onRequest;
const logger = require('firebase-functions/logger');
/* eslint-enable no-unused-vars */

// Exemple d'utilisation de onRequest
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
