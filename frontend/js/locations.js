// ==========================================
// POLAR SCIENCE PORTAL - LOCATIONS API
// ==========================================

async function loadLocations() {

    const locationList = document.querySelector(".location-list");
    const polarMap = document.querySelector(".polar-map");

    if (!locationList || !polarMap) {
        console.error("Map elements not found.");
        return;
    }

    try {

        const response = await getLocations();

        // Supports normal array and DRF paginated response
        const locations = Array.isArray(response)
            ? response
            : response.results || [];

        console.log("Locations loaded successfully:", locations);

        if (locations.length === 0) {
            locationList.innerHTML = `
                <p>No polar locations available.</p>
            `;
            return;
        }

        // Remove existing static markers
        polarMap.querySelectorAll(".map-marker").forEach(marker => {
            marker.remove();
        });

        // Clear static location list
        locationList.innerHTML = "";

        locations.forEach((location, index) => {

            // ==========================================
            // LOCATION LIST ITEM
            // ==========================================

            const locationItem = document.createElement("div");

            locationItem.className = "location-item";

            if (index === 0) {
                locationItem.classList.add("active");
            }

            locationItem.innerHTML = `
                <span class="location-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <div>
                    <strong>${location.name}</strong>
                    <small>
                        ${location.region || "Polar Region"}
                    </small>
                </div>

                <span class="location-arrow">
                    →
                </span>
            `;

            locationList.appendChild(locationItem);


            // ==========================================
            // MAP MARKER
            // ==========================================

            const marker = document.createElement("div");

            marker.className = "map-marker";

            marker.innerHTML = `
                <span></span>
                <label>${location.name}</label>
            `;

            // Approximate position on the stylized map
            const longitude = parseFloat(location.longitude);
            const latitude = parseFloat(location.latitude);

            const x = ((longitude + 180) / 360) * 100;

            const y = ((-latitude - 60) / 30) * 100;

            marker.style.left = `${Math.max(5, Math.min(95, x))}%`;
            marker.style.top = `${Math.max(10, Math.min(90, y))}%`;

            polarMap.appendChild(marker);


            // ==========================================
            // SELECT LOCATION
            // ==========================================

            locationItem.addEventListener("click", () => {

                document
                    .querySelectorAll(".location-item")
                    .forEach(item => {
                        item.classList.remove("active");
                    });

                locationItem.classList.add("active");

                showSelectedLocation(location, index);

            });

            marker.addEventListener("click", () => {

                document
                    .querySelectorAll(".location-item")
                    .forEach(item => {
                        item.classList.remove("active");
                    });

                locationItem.classList.add("active");

                showSelectedLocation(location, index);

            });

        });

        // Show first location by default
        showSelectedLocation(locations[0], 0);

    } catch (error) {

        console.error("Locations API error:", error);

        locationList.innerHTML = `
            <p>Unable to load locations.</p>
        `;
    }
}


// ==========================================
// SELECTED LOCATION DETAILS
// ==========================================

function showSelectedLocation(location, index) {

    const selectedLocation =
        document.querySelector(".selected-location");

    if (!selectedLocation) return;

    selectedLocation.innerHTML = `

        <div class="selected-index">
            ${String(index + 1).padStart(2, "0")}
        </div>

        <div class="selected-info">

            <span>
                SELECTED LOCATION
            </span>

            <h3>
                ${location.name}
            </h3>

            <p>
                ${location.description || "No description available."}
            </p>

        </div>

        <div class="selected-coordinates">

            <small>
                COORDINATES
            </small>

            <strong>
                ${location.latitude}°
            </strong>

            <strong>
                ${location.longitude}°
            </strong>

        </div>

    `;
}


// ==========================================
// SEARCH LOCATIONS
// ==========================================

function setupLocationSearch() {

    const searchInput =
        document.querySelector(".location-search input");

    const locationList =
        document.querySelector(".location-list");

    if (!searchInput || !locationList) return;

    searchInput.addEventListener("input", () => {

        const searchTerm =
            searchInput.value.toLowerCase().trim();

        const items =
            locationList.querySelectorAll(".location-item");

        items.forEach(item => {

            const text =
                item.textContent.toLowerCase();

            item.style.display =
                text.includes(searchTerm)
                    ? "flex"
                    : "none";

        });

    });
}


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadLocations();

    setupLocationSearch();

});