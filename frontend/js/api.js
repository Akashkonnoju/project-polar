// ==========================================
// POLAR SCIENCE PORTAL - API
// ==========================================

const API_BASE_URL = "http://127.0.0.1:8000/api";


// ---------- KNOWLEDGE ----------

async function getKnowledge() {
    const response = await fetch(`${API_BASE_URL}/knowledge/`);

    if (!response.ok) {
        throw new Error("Failed to fetch knowledge data");
    }

    return await response.json();
}


// ---------- RESEARCH ----------

async function getResearch() {
    const response = await fetch(`${API_BASE_URL}/research/`);

    if (!response.ok) {
        throw new Error("Failed to fetch research data");
    }

    return await response.json();
}


// ---------- MEDIA ----------

async function getMedia() {
    const response = await fetch(`${API_BASE_URL}/media/`);

    if (!response.ok) {
        throw new Error("Failed to fetch media data");
    }

    return await response.json();
}


// ---------- LOCATIONS ----------

async function getLocations() {
    const response = await fetch(`${API_BASE_URL}/locations/`);

    if (!response.ok) {
        throw new Error("Failed to fetch location data");
    }

    return await response.json();
}


// ---------- SEARCH ----------

async function searchContent(query) {

    const response = await fetch(
        `${API_BASE_URL}/search/?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Search failed");
    }

    return await response.json();
}


// ---------- REGISTER ----------

async function registerUser(userData) {

    const response = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    return await response.json();
}


// ---------- LOGIN ----------

async function loginUser(loginData) {

    const response = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    });

    return await response.json();
}