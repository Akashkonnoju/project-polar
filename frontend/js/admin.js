// ==========================================
// POLAR SCIENCE PORTAL - ADMIN DASHBOARD
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadAdminDashboard();

});


// ==========================================
// LOAD DASHBOARD DATA
// ==========================================

async function loadAdminDashboard() {

    try {

        const [
            knowledgeResponse,
            researchResponse,
            mediaResponse,
            locationsResponse
        ] = await Promise.all([

            getKnowledge(),
            getResearch(),
            getMedia(),
            getLocations()

        ]);


        // Handle normal array and DRF paginated response

        const knowledge = Array.isArray(knowledgeResponse)
            ? knowledgeResponse
            : knowledgeResponse.results || [];


        const research = Array.isArray(researchResponse)
            ? researchResponse
            : researchResponse.results || [];


        const media = Array.isArray(mediaResponse)
            ? mediaResponse
            : mediaResponse.results || [];


        const locations = Array.isArray(locationsResponse)
            ? locationsResponse
            : locationsResponse.results || [];


        // ==========================================
        // UPDATE STATISTICS
        // ==========================================

        updateDashboardStats(
            knowledge.length,
            research.length,
            media.length,
            locations.length
        );


        // ==========================================
        // UPDATE SIDEBAR COUNTS
        // ==========================================

        updateSidebarCounts(
            knowledge.length,
            research.length,
            media.length,
            locations.length
        );


        // ==========================================
        // UPDATE TOTAL CONTENT
        // ==========================================

        updateTotalContent(
            knowledge.length,
            research.length,
            media.length
        );


        console.log("Admin dashboard loaded successfully.");

        console.log({
            knowledge: knowledge.length,
            research: research.length,
            media: media.length,
            locations: locations.length
        });


    } catch (error) {

        console.error(
            "Admin dashboard API error:",
            error
        );

    }

}


// ==========================================
// UPDATE MAIN DASHBOARD STATISTICS
// ==========================================

function updateDashboardStats(
    knowledgeCount,
    researchCount,
    mediaCount,
    locationCount
) {

    const stats =
        document.querySelectorAll(
            ".dashboard-stat"
        );


    if (stats.length < 4) {
        console.warn(
            "Dashboard statistics not found."
        );
        return;
    }


    // Knowledge

    const knowledgeNumber =
        stats[0].querySelector("strong");

    if (knowledgeNumber) {
        knowledgeNumber.textContent =
            knowledgeCount;
    }


    // Research

    const researchNumber =
        stats[1].querySelector("strong");

    if (researchNumber) {
        researchNumber.textContent =
            researchCount;
    }


    // Media

    const mediaNumber =
        stats[2].querySelector("strong");

    if (mediaNumber) {
        mediaNumber.textContent =
            mediaCount;
    }


    // Locations

    const locationNumber =
        stats[3].querySelector("strong");

    if (locationNumber) {
        locationNumber.textContent =
            locationCount;
    }

}


// ==========================================
// UPDATE SIDEBAR COUNTS
// ==========================================

function updateSidebarCounts(
    knowledgeCount,
    researchCount,
    mediaCount,
    locationCount
) {

    const sidebarLinks =
        document.querySelectorAll(
            ".admin-nav-link"
        );


    sidebarLinks.forEach(link => {

        const text =
            link.textContent
                .trim()
                .toLowerCase();


        const count =
            link.querySelector(".nav-count");


        if (!count) return;


        if (text.includes("knowledge")) {

            count.textContent =
                knowledgeCount;

        }

        else if (text.includes("research")) {

            count.textContent =
                researchCount;

        }

        else if (text.includes("media")) {

            count.textContent =
                mediaCount;

        }

        else if (text.includes("locations")) {

            count.textContent =
                locationCount;

        }

    });

}


// ==========================================
// UPDATE TOTAL CONTENT
// ==========================================

function updateTotalContent(
    knowledgeCount,
    researchCount,
    mediaCount
) {

    const total =
        knowledgeCount +
        researchCount +
        mediaCount;


    const distributionTotal =
        document.querySelector(
            ".distribution-ring strong"
        );


    if (distributionTotal) {

        distributionTotal.textContent =
            total;

    }


    // Distribution rows

    const rows =
        document.querySelectorAll(
            ".distribution-row"
        );


    if (rows.length >= 3) {

        const values = [
            knowledgeCount,
            researchCount,
            mediaCount
        ];


        rows.forEach((row, index) => {

            const value =
                row.querySelector("strong");


            if (value) {

                value.textContent =
                    values[index];

            }

        });

    }

}