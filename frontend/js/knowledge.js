// ==========================================
// POLAR SCIENCE PORTAL - KNOWLEDGE API
// ==========================================

async function loadKnowledge() {
    const resourceGrid = document.querySelector(".resource-grid");

    if (!resourceGrid) {
        console.error("Knowledge resource grid not found.");
        return;
    }

    try {
        const response = await getKnowledge();

        // Supports normal array and DRF paginated response
        const knowledgeData = Array.isArray(response)
            ? response
            : response.results || [];

        resourceGrid.innerHTML = "";

        if (knowledgeData.length === 0) {
            resourceGrid.innerHTML = `
                <div class="no-results">
                    <p>No knowledge resources available.</p>
                </div>
            `;
            return;
        }

        knowledgeData.forEach((item) => {

            const card = document.createElement("article");
            card.className = "resource-card";

            card.innerHTML = `
                <div class="card-image">

                    <img
                        src="${item.image_url || "../assets/images/polar-hero-v2.png"}"
                        alt="${item.title || "Polar knowledge resource"}"
                    >

                    <span class="card-category">
                        ${item.category || "POLAR SCIENCE"}
                    </span>

                </div>

                <div class="card-body">

                    <div class="meta">
                        ${item.category || "POLAR SCIENCE"}
                    </div>

                    <h3>
                        ${item.title || "Untitled Resource"}
                    </h3>

                    <p>
                        ${item.description || "No description available."}
                    </p>
<div class="knowledge-author">
    ${item.author || "Polar Research"}
</div>
                    ${
                        item.file_url
                            ? `
                                <a
                                    href="${item.file_url}"
                                    class="read-more"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read more →
                                </a>
                              `
                            : `
                                <span class="read-more">
                                    Resource available
                                </span>
                              `
                    }

                </div>
            `;

            resourceGrid.appendChild(card);
        });

        console.log("Knowledge loaded successfully:", knowledgeData);

    } catch (error) {

        console.error("Knowledge API error:", error);

        resourceGrid.innerHTML = `
            <div class="no-results">
                <p>Unable to load knowledge data.</p>
                <small>Please try again later.</small>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", loadKnowledge);