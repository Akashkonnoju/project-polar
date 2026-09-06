// ==========================================
// POLAR SCIENCE PORTAL - MEDIA API
// ==========================================

async function loadMedia() {
    const mediaGrid = document.querySelector(".media-grid");

    if (!mediaGrid) {
        console.error("Media grid not found.");
        return;
    }

    try {
        const response = await getMedia();

        // Supports normal array and DRF paginated response
        const mediaData = Array.isArray(response)
            ? response
            : response.results || [];

        mediaGrid.innerHTML = "";

        if (mediaData.length === 0) {
            mediaGrid.innerHTML = `
                <div class="no-results">
                    <p>No media resources available.</p>
                </div>
            `;
            return;
        }

        mediaData.forEach((item) => {
            const card = document.createElement("article");
            card.className = "media-card";

            const mediaType = (item.media_type || "media").toUpperCase();

            card.innerHTML = `
                <div class="media-card-image">

                    <img
                        src="${item.thumbnail || "../assets/images/polar-hero-v2.png"}"
                        alt="${item.title || "Polar media"}"
                    >

                    <span class="media-type">
                        ${mediaType}
                    </span>

                    ${
                        item.media_type &&
                        item.media_type.toLowerCase() === "video"
                            ? `<span class="play-small">▶</span>`
                            : ""
                    }

                </div>

                <div class="media-card-body">

                    <div class="media-card-meta">
                        ${item.date || "POLAR MEDIA"}
                    </div>

                    <h3>
                        ${item.title || "Untitled Media"}
                    </h3>

                    <p>
                        ${item.description || "No description available."}
                    </p>

                    ${
                        item.media_url
                            ? `
                                <a
                                    href="${item.media_url}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ${
                                        item.media_type &&
                                        item.media_type.toLowerCase() === "video"
                                            ? "Watch video →"
                                            : "View media →"
                                    }
                                </a>
                              `
                            : `
                                <span>
                                    Media available
                                </span>
                              `
                    }

                </div>
            `;

            mediaGrid.appendChild(card);
        });

        console.log("Media loaded successfully:", mediaData);

    } catch (error) {
        console.error("Media API error:", error);

        mediaGrid.innerHTML = `
            <div class="no-results">
                <p>Unable to load media data.</p>
                <small>Please try again later.</small>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", loadMedia);