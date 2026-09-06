// ==========================================
// POLARCONNECT - RESEARCH PAGE
// ==========================================

let allResearchData = [];
let currentResearchData = [];


// ==========================================
// LOAD RESEARCH
// ==========================================

async function loadResearch() {

    const researchGrid = document.querySelector(
        ".research-results .research-grid"
    );

    if (!researchGrid) {
        console.error("Research grid not found.");
        return;
    }

    try {

        const response = await getResearch();

        // Support normal and paginated API responses
        const researchData = Array.isArray(response)
            ? response
            : response.results || [];

        // Remove duplicate research items
        const uniqueResearch = [];
        const seenTitles = new Set();

        researchData.forEach(research => {

            const title = (
                research.title ||
                "Untitled Research"
            ).trim().toLowerCase();

            if (!seenTitles.has(title)) {
                seenTitles.add(title);
                uniqueResearch.push(research);
            }

        });

        allResearchData = uniqueResearch;
        currentResearchData = uniqueResearch;

        renderResearch(currentResearchData);

        setupResearchFilters();

        updateResearchCount(allResearchData.length);

        console.log(
            "Research loaded successfully:",
            allResearchData
        );

    } catch (error) {

        console.error(
            "Research API error:",
            error
        );

        researchGrid.innerHTML = `
            <div class="no-results">
                <p>Unable to load research data.</p>
                <small>Please try again later.</small>
            </div>
        `;
    }
}


// ==========================================
// RENDER RESEARCH
// ==========================================

function renderResearch(researchData) {

    const researchGrid = document.querySelector(
        ".research-results .research-grid"
    );

    if (!researchGrid) {
        return;
    }

    researchGrid.innerHTML = "";

    if (researchData.length === 0) {

        researchGrid.innerHTML = `
            <div class="no-results">
                <p>No research publications available.</p>
            </div>
        `;

        return;
    }


    researchData.forEach(research => {

        const card = document.createElement("article");

        card.className = "research-card";


        // ------------------------------------------
        // CATEGORY
        // ------------------------------------------

        const category = getResearchCategory(research);


        // ------------------------------------------
        // YEAR
        // ------------------------------------------

        const year =
            research.year ||
            research.publication_year ||
            "";


        // ------------------------------------------
        // DESCRIPTION
        // ------------------------------------------

        const description =
            research.abstract ||
            research.description ||
            "No abstract available.";


        // ------------------------------------------
        // SOURCE
        // ------------------------------------------

        const source =
            research.journal ||
            research.authors ||
            "Polar Research";


        // ------------------------------------------
        // RESEARCH LINK
        // ------------------------------------------

        let researchLink = "";

        if (research.pdf_url) {

            researchLink = `
                <a
                    href="${research.pdf_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open research PDF"
                >
                    →
                </a>
            `;

        } else if (research.external_link) {

            researchLink = `
                <a
                    href="${research.external_link}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open research"
                >
                    →
                </a>
            `;

        } else if (research.url) {

            researchLink = `
                <a
                    href="${research.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open research"
                >
                    →
                </a>
            `;

        } else {

            researchLink = `
                <span class="research-no-link">
                    →
                </span>
            `;
        }


        // ------------------------------------------
        // CARD HTML
        // ------------------------------------------

        card.innerHTML = `

            <div class="research-card-top">

                <span class="research-category">
                    ${category}
                </span>

                <span class="research-year">
                    ${year}
                </span>

            </div>


            <h3>
                ${research.title || "Untitled Research"}
            </h3>


            <p>
                ${description}
            </p>


            <div class="research-card-footer">

                <span>
                    ${source}
                </span>

                ${researchLink}

            </div>

        `;


        researchGrid.appendChild(card);

    });
}


// ==========================================
// GET RESEARCH CATEGORY
// ==========================================

function getResearchCategory(research) {

    if (research.category) {

        return String(research.category)
            .replace(/_/g, " ")
            .toUpperCase();

    }


    const text = `

        ${research.title || ""}

        ${research.abstract || ""}

        ${research.description || ""}

    `.toLowerCase();


    if (
        text.includes("climate") ||
        text.includes("temperature") ||
        text.includes("atmosphere") ||
        text.includes("warming")
    ) {

        return "CLIMATE";

    }


    if (
        text.includes("ice") ||
        text.includes("glacier") ||
        text.includes("cryosphere") ||
        text.includes("snow")
    ) {

        return "ICE";

    }


    if (
        text.includes("ocean") ||
        text.includes("sea") ||
        text.includes("marine") ||
        text.includes("circulation")
    ) {

        return "OCEANS";

    }


    if (
        text.includes("ecosystem") ||
        text.includes("wildlife") ||
        text.includes("species") ||
        text.includes("biodiversity") ||
        text.includes("ecology")
    ) {

        return "ECOSYSTEMS";

    }


    return "POLAR RESEARCH";
}


// ==========================================
// FILTER RESEARCH
// ==========================================

function setupResearchFilters() {

    const filterButtons = document.querySelectorAll(
        ".research-filters button"
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

            // Add active state
            button.classList.add("active");


            const selectedCategory =
                button.dataset.category;


            // ALL RESEARCH
            if (
                !selectedCategory ||
                selectedCategory === "all"
            ) {

                currentResearchData =
                    allResearchData;

            }

            // FILTERED RESEARCH
            else {

                currentResearchData =
                    allResearchData.filter(research => {

                        const category =
                            getResearchCategory(research)
                                .toLowerCase();

                        const title = (
                            research.title || ""
                        ).toLowerCase();

                        const description = (
                            research.abstract ||
                            research.description ||
                            ""
                        ).toLowerCase();


                        if (
                            selectedCategory === "climate"
                        ) {

                            return (
                                category.includes("climate") ||
                                title.includes("climate") ||
                                description.includes("climate")
                            );

                        }


                        if (
                            selectedCategory === "ice"
                        ) {

                            return (
                                category.includes("ice") ||
                                category.includes("glacier") ||
                                title.includes("ice") ||
                                title.includes("glacier") ||
                                description.includes("ice") ||
                                description.includes("glacier")
                            );

                        }


                        if (
                            selectedCategory === "oceans"
                        ) {

                            return (
                                category.includes("ocean") ||
                                title.includes("ocean") ||
                                description.includes("ocean")
                            );

                        }


                        if (
                            selectedCategory === "ecosystems"
                        ) {

                            return (
                                category.includes("ecosystem") ||
                                category.includes("ecology") ||
                                title.includes("ecosystem") ||
                                title.includes("ecology") ||
                                description.includes("ecosystem") ||
                                description.includes("ecology")
                            );

                        }


                        return false;

                    });

            }


            renderResearch(currentResearchData);

        });

    });

}


// ==========================================
// UPDATE RESEARCH COUNT
// ==========================================

function updateResearchCount(count) {

    const countElement =
        document.querySelector(
            ".research-count strong"
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
    loadResearch
);