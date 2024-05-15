// Si les imports ne sont pas utilisés, commentez-les ou supprimez-les
// const functions = require('firebase-functions');
// const logger = require('firebase-functions/logger');

// Exemple d'utilisation (si nécessaire)
const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
/* eslint-disable no-unused-vars */
const functions = require('firebase-functions');
const logger = require('firebase-functions/logger');
/* eslint-enable no-unused-vars */
