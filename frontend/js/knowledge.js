// ==========================================
// POLAR SCIENCE PORTAL - KNOWLEDGE API
// ==========================================

let allKnowledgeData = [];

async function loadKnowledge() {

    const resourceGrid = document.querySelector(".resource-grid");

    if (!resourceGrid) {
        console.error("Knowledge resource grid not found.");
        return;
    }

    try {

        const response = await getKnowledge();

        allKnowledgeData = Array.isArray(response)
            ? response
            : response.results || [];

        renderKnowledge(allKnowledgeData);

        console.log(
            "Knowledge loaded successfully:",
            allKnowledgeData
        );

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


// ==========================================
// RENDER KNOWLEDGE CARDS
// ==========================================

function renderKnowledge(knowledgeData) {

    const resourceGrid =
        document.querySelector(".resource-grid");

    if (!resourceGrid) return;

    resourceGrid.innerHTML = "";

    if (knowledgeData.length === 0) {

        resourceGrid.innerHTML = `
            <div class="no-results">
                <p>No resources found for this category.</p>
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
}


// ==========================================
// CATEGORY FILTERS
// ==========================================

function setupCategoryFilters() {

    const categoryButtons =
        document.querySelectorAll(
            ".category-tabs button"
        );

    if (!categoryButtons.length) {
        return;
    }

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Active button
            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            const category =
                button.dataset.category;


            // Show everything
            if (category === "all") {

                renderKnowledge(allKnowledgeData);

                return;
            }


            // Filter by category
            const filteredData =
                allKnowledgeData.filter(item => {

                    const itemCategory =
                        (item.category || "")
                            .toLowerCase();

                    const title =
                        (item.title || "")
                            .toLowerCase();

                    const description =
                        (item.description || "")
                            .toLowerCase();


                    if (category === "climate") {

                        return (
                            itemCategory.includes("climate") ||
                            title.includes("climate") ||
                            description.includes("climate")
                        );

                    }


                    if (category === "ice") {

                        return (
                            itemCategory.includes("ice") ||
                            itemCategory.includes("glacier") ||
                            title.includes("ice") ||
                            title.includes("glacier") ||
                            description.includes("ice") ||
                            description.includes("glacier")
                        );

                    }


                    if (category === "oceans") {

                        return (
                            itemCategory.includes("ocean") ||
                            title.includes("ocean") ||
                            description.includes("ocean")
                        );

                    }


                    if (category === "wildlife") {

                        return (
                            itemCategory.includes("wildlife") ||
                            itemCategory.includes("ecosystem") ||
                            title.includes("wildlife") ||
                            title.includes("ecosystem") ||
                            description.includes("wildlife") ||
                            description.includes("ecosystem")
                        );

                    }

                    return false;

                });


            renderKnowledge(filteredData);

        });

    });
}


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadKnowledge();

    setupCategoryFilters();

});