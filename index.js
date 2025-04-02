const API_URL = "http://localhost:5000";

// Room Locator
document.getElementById("searchRoomButton").addEventListener("click", async () => {
    const roomName = document.getElementById("roomSearch").value;
    const response = await fetch(`${API_URL}/search-room?room=${roomName}`);
    const data = await response.json();
    document.getElementById("roomResult").textContent = `Location: ${data.location}`;
});

// Lost & Found
document.getElementById("reportLostItemButton").addEventListener("click", async () => {
    const item = document.getElementById("lostItem").value;
    const description = document.getElementById("lostDescription").value;

    await fetch(`${API_URL}/report-lost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, description })
    });

    alert("Lost item reported successfully!");
    fetchLostItems();
});

async function fetchLostItems() {
    const response = await fetch(`${API_URL}/found-items`);
    const items = await response.json();

    document.getElementById("foundItems").innerHTML = items.map(item => 
        `<li>${item.item} - ${item.description}</li>`
    ).join("");
}
fetchLostItems();

// Transport Timetable (User Can Add)
document.getElementById("addTransportButton").addEventListener("click", async () => {
    const route = document.getElementById("transportRoute").value;
    const time = document.getElementById("transportTime").value;

    await fetch(`${API_URL}/add-transport`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ route, time })
    });

    alert("Transport added successfully!");
    fetchTimetable();
});

async function fetchTimetable() {
    const response = await fetch(`${API_URL}/timetable`);
    const timetable = await response.json();

    document.getElementById("timetableList").innerHTML = timetable.map(entry => 
        `<li>${entry.route} - ${entry.time}</li>`
    ).join("");
}
fetchTimetable();

// Notices
document.getElementById("postNoticeButton").addEventListener("click", async () => {
    const title = document.getElementById("noticeTitle").value;
    const content = document.getElementById("noticeContent").value;

    await fetch(`${API_URL}/post-notice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    });

    alert("Notice posted successfully!");
    fetchNotices();
});

async function fetchNotices() {
    const response = await fetch(`${API_URL}/notices`);
    const notices = await response.json();

    document.getElementById("noticeList").innerHTML = notices.map(notice => 
        `<li><strong>${notice.title}:</strong> ${notice.content}</li>`
    ).join("");
}
fetchNotices();

// Water Dispensers (User Can Add)
document.getElementById("addDispenserButton").addEventListener("click", async () => {
    const location = document.getElementById("dispenserLocation").value;
    const status = document.getElementById("dispenserStatus").value;

    await fetch(`${API_URL}/add-water-dispenser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, status })
    });

    alert("Water dispenser added successfully!");
    fetchWaterDispensers();
});

// Update Water Dispenser Status
document.getElementById("updateDispenserButton").addEventListener("click", async () => {
    const location = document.getElementById("updateLocation").value;
    const status = document.getElementById("updateStatus").value;

    const response = await fetch(`${API_URL}/update-water-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, status })
    });

    const result = await response.json();
    alert(result.message);
    fetchWaterDispensers();
});

// Fetch and Display Water Dispensers
async function fetchWaterDispensers() {
    const response = await fetch(`${API_URL}/water-dispensers`);
    const dispensers = await response.json();

    document.getElementById("waterDispensersList").innerHTML = dispensers.map(d =>
        `<li>${d.location} - <strong>${d.status}</strong></li>`
    ).join("");
}
fetchWaterDispensers();