const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Carregar as variáveis de ambiente do .env
dotenv.config();

// Parse the FIREBASE_SERVICE_ACCOUNT_KEY environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };
