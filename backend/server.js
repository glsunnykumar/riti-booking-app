const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const Stripe = require("stripe");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

// 🔹 Initialize Firebase Admin SDK
const serviceAccount = require("./firebaseAdmin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore instance
const db = admin.firestore();

// 🔹 Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("SaaS Backend is Running...");
});

// 🔹 Create Booking API
app.post("/api/bookings", async (req, res) => {
  try {
    const { userId, service, date, time } = req.body;

    const bookingRef = await db.collection("bookings").add({
      userId,
      service,
      date,
      time,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "Booking created", id: bookingRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Get All Bookings API
app.get("/api/bookings", async (req, res) => {
  try {
    const snapshot = await db.collection("bookings").get();
    const bookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Payment API (Stripe)
app.post("/api/payments", async (req, res) => {
  try {
    const { amount, currency, token } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      payment_method: token,
      confirm: true,
    });

    res.status(200).json({ message: "Payment successful", paymentIntent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
