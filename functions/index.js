import { https } from "firebase-functions";
import express, { json } from "express";
import cors from "cors";
const stripe = require("stripe")(
    'sk_test_51KYAILFF7Q2fbfRNmhCIhnRZ37RAjBoYFW8dNa5Qkcs41kEAeynCabQgbL960If69GUoJs8bAAlBF2pZrzzcCcgE00IqJxG9d2'
);


// setup API

// App config
const app = express();

// middlewares 
// cors is like a security
app.use(cors({ origin: true}));
app.use(json());

// API routes
app.get("/", (request, response) => response.status(200).send('hello world'));
//app.get('/melissa', (request, response) => response.status(200).send('whats up melissa'))

app.post("payments/create", async (request, response) => {
    const total = request.query.total;
    console.log("Payment Request received for this amount -> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunit of the currency
        currency: "jpy",
    });

    // OK but created sth
    response.status(201).send({
        clientSecret: '{{CLIENT_SECRET}}',
    });
});


export const api = https.onRequest(app);

// API endpoint
// http://localhost:5001/clone-90991/us-central1/api




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
