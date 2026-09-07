// ==========================================
// POLARCONNECT - MEDIA PAGE
// ==========================================

let allMediaData = [];
let currentMediaData = [];


// ==========================================
// LOAD MEDIA
// ==========================================

async function loadMedia() {

    const mediaGrid = document.querySelector(".media-grid");

    if (!mediaGrid) {
        console.error("Media grid not found.");
        return;
    }

    try {

        const response = await getMedia();

        // Support normal array and DRF paginated response
        const mediaData = Array.isArray(response)
            ? response
            : response.results || [];


        // Remove duplicate media
        const uniqueMedia = [];
        const seenTitles = new Set();

        mediaData.forEach(item => {

            const title = (
                item.title ||
                "Untitled Media"
            ).trim().toLowerCase();

            if (!seenTitles.has(title)) {

                seenTitles.add(title);
                uniqueMedia.push(item);

            }

        });


        allMediaData = uniqueMedia;
        currentMediaData = uniqueMedia;


        renderMedia(currentMediaData);

        setupMediaFilters();

        updateMediaCount(allMediaData.length);


        console.log(
            "Media loaded successfully:",
            allMediaData
        );


    } catch (error) {

        console.error(
            "Media API error:",
            error
        );

        mediaGrid.innerHTML = `
            <div class="no-results">
                <p>Unable to load media data.</p>
                <small>Please try again later.</small>
            </div>
        `;

    }
}


// ==========================================
// RENDER MEDIA
// ==========================================

function renderMedia(mediaData) {

    const mediaGrid = document.querySelector(".media-grid");

    if (!mediaGrid) {
        return;
    }


    mediaGrid.innerHTML = "";


    if (mediaData.length === 0) {

        mediaGrid.innerHTML = `
            <div class="no-results">
                <p>No media resources available.</p>
            </div>
        `;

        return;
    }


    mediaData.forEach(item => {

        const card = document.createElement("article");

        card.className = "media-card";


        // ------------------------------------------
        // MEDIA TYPE
        // ------------------------------------------

        const rawType =
            item.media_type ||
            item.type ||
            "media";

        const mediaType =
            String(rawType).toUpperCase();


        const typeLower =
            String(rawType).toLowerCase();


        // ------------------------------------------
        // IMAGE
        // ------------------------------------------

        const imageUrl =
            item.thumbnail ||
            item.image_url ||
            item.image ||
            "../assets/images/polar-hero-v2.png";


        // ------------------------------------------
        // DESCRIPTION
        // ------------------------------------------

        const description =
            item.description ||
            item.abstract ||
            "No description available.";


        // ------------------------------------------
        // DATE / LOCATION
        // ------------------------------------------

        const meta =
            item.date ||
            item.location ||
            "POLAR MEDIA";


        // ------------------------------------------
        // MEDIA LINK
        // ------------------------------------------

        const mediaUrl =
            item.media_url ||
            item.url ||
            item.external_link ||
            item.video_url ||
            "";


        let mediaLink;


        if (mediaUrl) {

            let linkText = "View media →";


            if (typeLower === "video") {
                linkText = "Watch video →";
            }

            else if (
                typeLower === "photography" ||
                typeLower === "photo" ||
                typeLower === "image"
            ) {
                linkText = "View gallery →";
            }

            else if (typeLower === "story") {
                linkText = "Read story →";
            }


            mediaLink = `
                <a
                    href="${mediaUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ${linkText}
                </a>
            `;

        }

        else {

            mediaLink = `
                <span class="media-no-link">
                    Media available
                </span>
            `;

        }


        // ------------------------------------------
        // VIDEO ICON
        // ------------------------------------------

        const playIcon =
            typeLower === "video"
                ? `<span class="play-small">▶</span>`
                : "";


        // ------------------------------------------
        // CARD
        // ------------------------------------------

        card.innerHTML = `

            <div class="media-card-image">

                <img
                    src="${imageUrl}"
                    alt="${item.title || "Polar media"}"
                    loading="lazy"
                >

                <span class="media-type">
                    ${mediaType}
                </span>

                ${playIcon}

            </div>


            <div class="media-card-body">

                <div class="media-card-meta">
                    ${meta}
                </div>


                <h3>
                    ${item.title || "Untitled Media"}
                </h3>


                <p>
                    ${description}
                </p>


                ${mediaLink}

            </div>

        `;


        mediaGrid.appendChild(card);

    });

}


// ==========================================
// MEDIA FILTERS
// ==========================================

function setupMediaFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".media-tabs button"
        );


    if (!filterButtons.length) {
        return;
    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Remove active state
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });


            // Activate selected button
            button.classList.add("active");


            const selectedFilter =
                button.dataset.type ||
                button.textContent
                    .trim()
                    .toLowerCase();


            // ALL MEDIA
            if (
                selectedFilter === "all" ||
                selectedFilter === "all media"
            ) {

                currentMediaData =
                    allMediaData;

            }


            // VIDEOS
            else if (
                selectedFilter === "video" ||
                selectedFilter === "videos"
            ) {

                currentMediaData =
                    allMediaData.filter(item => {

                        const type = String(
                            item.media_type ||
                            item.type ||
                            ""
                        ).toLowerCase();

                        return type === "video";

                    });

            }


            // PHOTOGRAPHY
            else if (
                selectedFilter === "photography"
            ) {

                currentMediaData =
                    allMediaData.filter(item => {

                        const type = String(
                            item.media_type ||
                            item.type ||
                            ""
                        ).toLowerCase();

                        return (
                            type === "photography" ||
                            type === "photo" ||
                            type === "image"
                        );

                    });

            }


            // STORIES
            else if (
                selectedFilter === "stories" ||
                selectedFilter === "story"
            ) {

                currentMediaData =
                    allMediaData.filter(item => {

                        const type = String(
                            item.media_type ||
                            item.type ||
                            ""
                        ).toLowerCase();

                        return type === "story";

                    });

            }


            renderMedia(currentMediaData);

        });

    });

}


// ==========================================
// UPDATE MEDIA COUNT
// ==========================================

function updateMediaCount(count) {

    const countElement =
        document.querySelector(
            ".media-count strong"
        );


    if (!countElement) {
        return;
    }


    countElement.textContent = count;

}


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadMedia
);
