const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Allow frontend to access backend

// Data Storage
const rooms = { "A101": "Block A, First Floor", "B202": "Block B, Second Floor" };
const lostItems = [];
const notices = [];
const timetable = [];
const waterDispensers = []; // Now includes status (Available / Finished)

// Room Locator API
app.get("/search-room", (req, res) => {
    const roomName = req.query.room;
    const result = rooms[roomName] || "Room not found";
    res.json({ room: roomName, location: result });
});

// Lost & Found API
app.post("/report-lost", (req, res) => {
    lostItems.push(req.body);
    res.json({ message: "Lost item reported successfully" });
});

app.get("/found-items", (req, res) => {
    res.json(lostItems);
});

// Transport Timetable API
app.post("/add-transport", (req, res) => {
    timetable.push(req.body);
    res.json({ message: "Transport entry added successfully!" });
});

app.get("/timetable", (req, res) => {
    res.json(timetable);
});

// Digital Notice Board API
app.post("/post-notice", (req, res) => {
    notices.push(req.body);
    res.json({ message: "Notice posted successfully" });
});

app.get("/notices", (req, res) => {
    res.json(notices);
});

// Water Dispensers API
app.post("/add-water-dispenser", (req, res) => {
    const { location, status } = req.body;
    waterDispensers.push({ location, status });
    res.json({ message: "Water dispenser added successfully!" });
});

// Update Water Dispenser Status
app.put("/update-water-status", (req, res) => {
    const { location, status } = req.body;
    const dispenser = waterDispensers.find(d => d.location === location);
    
    if (dispenser) {
        dispenser.status = status;
        res.json({ message: "Water status updated successfully!" });
    } else {
        res.status(404).json({ message: "Dispenser not found!" });
    }
});

// Get Water Dispensers
app.get("/water-dispensers", (req, res) => {
    res.json(waterDispensers);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
