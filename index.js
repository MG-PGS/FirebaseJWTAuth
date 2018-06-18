import http from 'http';

// ------------------------------------------
// Simple Node Server (https://github.com/babel/example-node-server)
// ------------------------------------------

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

// ------------------------------------------
// Firebase logic for JSON Web Token creation
// ------------------------------------------

var admin = require('firebase-admin'); // requires npm install --save firebase-admin !!!
var serviceAccount = require('./serviceAccountKey.json'); // This is a private key which allows us to access Firebase project - We can receive it directly from Project Overview > Ustawienia projektu > KONTA USLUGI > GENEROWANIE NOWEGO KLUCZA PRYWATNEGO

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nodeexpress-fc15e.firebaseio.com'
});

var uid = "b931b4e0..."; // uid comes from Firebase Database/Rules panel

admin.auth().createCustomToken(uid)
    .then(function(customToken) {
        // Send token back to client (in our case we use this token to authenticate request in index.html form -> signInWithCustomToken() method)
        console.log(customToken);
    })
    .catch(function(error) {
        console.log("Error creating custom token:", error);
    });