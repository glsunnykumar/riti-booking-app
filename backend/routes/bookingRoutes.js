const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();
const bookingsRef = db.collection("bookings");

// 📌 Create a Booking
router.post("/create", async (req, res) => {
  try {
    const { userId, service, date, time, price } = req.body;
    const newBooking = {
      userId,
      service,
      date,
      time,
      price,
      status: "pending",
      createdAt: new Date(),
    };

    const docRef = await bookingsRef.add(newBooking);
    res.status(201).json({ id: docRef.id, ...newBooking });
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// 📌 Fetch All Bookings
router.get("/all", async (req, res) => {
  try {
    const snapshot = await bookingsRef.get();
    const bookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// 📌 Get Booking by ID
router.get("/:id", async (req, res) => {
  try {
    const doc = await bookingsRef.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

// 📌 Update Booking
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    await bookingsRef.doc(req.params.id).update({ status });
    res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});

// 📌 Delete Booking
router.delete("/:id", async (req, res) => {
  try {
    await bookingsRef.doc(req.params.id).delete();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

module.exports = router;
