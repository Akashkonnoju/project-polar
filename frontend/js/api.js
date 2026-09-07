// ==========================================
// POLARCONNECT - CENTRAL API CLIENT
// Existing APIs are preserved; new portal APIs are added.
// ==========================================

const API_BASE_URL = "http://127.0.0.1:8000/api";

async function apiGet(path) {
    const response = await fetch(`${API_BASE_URL}${path}`);
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    return await response.json();
}

async function getKnowledge() { return apiGet("/knowledge/"); }
async function getResearch() { return apiGet("/research/"); }
async function getMedia() { return apiGet("/media/"); }
async function getLocations() { return apiGet("/locations/"); }

async function getTopics(topic = "", region = "") {
    const params = new URLSearchParams();
    if (topic) params.set("topic", topic);
    if (region) params.set("region", region);
    return apiGet(`/topics/${params.toString() ? "?" + params.toString() : ""}`);
}

async function getDatasets(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
    });
    return apiGet(`/datasets/${params.toString() ? "?" + params.toString() : ""}`);
}

async function getDataset(id) { return apiGet(`/datasets/${id}/`); }
async function getDatasetPoints(id) { return apiGet(`/datasets/${id}/points/`); }

async function getResources(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
    });
    return apiGet(`/resources/${params.toString() ? "?" + params.toString() : ""}`);
}

async function getResource(id) { return apiGet(`/resources/${id}/`); }

async function searchContent(query) {
    return apiGet(`/search/?q=${encodeURIComponent(query)}`);
}

async function registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData)
    });
    return await response.json();
}

async function loginUser(loginData) {
    const response = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(loginData)
    });
    return await response.json();
}
