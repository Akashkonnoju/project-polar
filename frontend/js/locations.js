// ==========================================
// POLAR SCIENCE PORTAL - LOCATIONS
// ==========================================

let allLocations = [];
let currentLocations = [];


// ==========================================
// LOAD LOCATIONS FROM API
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

        allLocations = Array.isArray(response)
            ? response
            : response.results || [];

        currentLocations = [...allLocations];

        console.log(
            "Locations loaded successfully:",
            allLocations
        );

        renderLocations(currentLocations);

    } catch (error) {

        console.error("Locations API error:", error);

        locationList.innerHTML = `
            <p>Unable to load locations.</p>
        `;
    }
}


// ==========================================
// RENDER LOCATIONS
// ==========================================

function renderLocations(locations) {

    const locationList =
        document.querySelector(".location-list");

    const polarMap =
        document.querySelector(".polar-map");

    if (!locationList || !polarMap) return;

    // Remove API/static markers
    polarMap
        .querySelectorAll(".map-marker")
        .forEach(marker => marker.remove());

    // Clear location list
    locationList.innerHTML = "";


    if (locations.length === 0) {

        locationList.innerHTML = `
            <p>No locations found.</p>
        `;

        return;
    }


    locations.forEach((location, index) => {

        // ==========================================
        // LOCATION LIST ITEM
        // ==========================================

        const locationItem =
            document.createElement("div");

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

        const marker =
            document.createElement("div");

        marker.className = "map-marker";

        marker.innerHTML = `
            <span></span>
            <label>${location.name}</label>
        `;


        const longitude =
            parseFloat(location.longitude);

        const latitude =
            parseFloat(location.latitude);


        if (!isNaN(longitude) && !isNaN(latitude)) {

            const x =
                ((longitude + 180) / 360) * 100;

            const y =
                ((-latitude - 60) / 30) * 100;

            marker.style.left =
                `${Math.max(5, Math.min(95, x))}%`;

            marker.style.top =
                `${Math.max(10, Math.min(90, y))}%`;
        }


        polarMap.appendChild(marker);


        // ==========================================
        // LOCATION SELECTION
        // ==========================================

        locationItem.addEventListener(
            "click",
            () => {

                selectLocation(
                    location,
                    index,
                    locationItem,
                    marker
                );

            }
        );


        marker.addEventListener(
            "click",
            () => {

                selectLocation(
                    location,
                    index,
                    locationItem,
                    marker
                );

            }
        );

    });


    // Select first location
    if (locations.length > 0) {

        const firstItem =
            locationList.querySelector(".location-item");

        const firstMarker =
            polarMap.querySelector(".map-marker");

        selectLocation(
            locations[0],
            0,
            firstItem,
            firstMarker
        );
    }
}


// ==========================================
// SELECT LOCATION
// ==========================================

function selectLocation(
    location,
    index,
    locationItem,
    marker
) {

    document
        .querySelectorAll(".location-item")
        .forEach(item => {
            item.classList.remove("active");
        });

    document
        .querySelectorAll(".map-marker")
        .forEach(item => {
            item.classList.remove("selected");
        });


    if (locationItem) {
        locationItem.classList.add("active");
    }

    if (marker) {
        marker.classList.add("selected");
    }


    showSelectedLocation(
        location,
        index
    );
}


// ==========================================
// SELECTED LOCATION DETAILS
// ==========================================

function showSelectedLocation(
    location,
    index
) {

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
                ${location.description ||
                "No description available."}
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
// LOCATION SEARCH
// ==========================================

function setupLocationSearch() {

    const searchInput =
        document.querySelector(
            ".location-search input"
        );

    if (!searchInput) return;


    searchInput.addEventListener(
        "input",
        () => {

            const searchTerm =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const filtered =
                allLocations.filter(location => {

                    const text = `
                        ${location.name || ""}
                        ${location.region || ""}
                        ${location.description || ""}
                    `.toLowerCase();

                    return text.includes(searchTerm);
                });


            currentLocations = filtered;

            renderLocations(
                currentLocations
            );

        }
    );
}


// ==========================================
// REGION FILTERS
// ==========================================

function setupRegionFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".region-filters button"
        );

    if (!filterButtons.length) return;


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                // Active filter
                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");


                const filter =
                    button.textContent
                        .trim()
                        .toLowerCase();


                let filtered =
                    [...allLocations];


                // ==================================
                // ANTARCTICA
                // ==================================

                if (filter === "antarctica") {

                    filtered =
                        allLocations.filter(location => {

                            const region =
                                (location.region || "")
                                    .toLowerCase();

                            const name =
                                (location.name || "")
                                    .toLowerCase();

                            return (
                                region.includes("antarctica") ||
                                name.includes("antarctica")
                            );

                        });

                }


                // ==================================
                // ARCTIC
                // ==================================

                else if (filter === "arctic") {

                    filtered =
                        allLocations.filter(location => {

                            const region =
                                (location.region || "")
                                    .toLowerCase();

                            const name =
                                (location.name || "")
                                    .toLowerCase();

                            const description =
                                (location.description || "")
                                    .toLowerCase();

                            return (
                                region.includes("arctic") ||
                                name.includes("arctic") ||
                                description.includes("arctic")
                            );

                        });

                }


                // ==================================
                // INDIAN SECTOR
                // ==================================

                else if (filter === "indian sector") {

                    filtered =
                        allLocations.filter(location => {

                            const text = `
                                ${location.name || ""}
                                ${location.region || ""}
                                ${location.description || ""}
                            `.toLowerCase();

                            return (
                                text.includes("india") ||
                                text.includes("indian") ||
                                text.includes("maitri") ||
                                text.includes("bharati")
                            );

                        });

                }


                // ==================================
                // RESEARCH STATIONS
                // ==================================

                else if (
                    filter === "research stations"
                ) {

                    filtered =
                        allLocations.filter(location => {

                            const text = `
                                ${location.name || ""}
                                ${location.description || ""}
                            `.toLowerCase();

                            return (
                                text.includes("station") ||
                                text.includes("research")
                            );

                        });

                }


                currentLocations = filtered;

                renderLocations(
                    currentLocations
                );

            }
        );

    });
}


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadLocations();

        setupLocationSearch();

        setupRegionFilters();

    }
);