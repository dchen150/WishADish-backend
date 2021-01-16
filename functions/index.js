const functions = require("firebase-functions");
const vision = require('@google-cloud/vision');
const fs = require('fs');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.goodBye = functions.https.onRequest((request, response) => {
  functions.logger.info("bye logs!", {structuredData: true});
  response.send("goodBye");
});

exports.findFood = functions.https.onRequest(async (request, response) => {
  const client = new vision.ImageAnnotatorClient();
  const req = {
    image: {content: fs.readFileSync('./apple.jpg')},
  }

  const [result] = await client.objectLocalization(req);
  const objects = result.localizedObjectAnnotations;

  functions.logger.info("findFood logs!", {structuredData: true});
  response.send(objects);
});
