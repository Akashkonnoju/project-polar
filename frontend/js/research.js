// ==========================================
// POLARCONNECT - RESEARCH PAGE
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

            card.innerHTML = `

                <div class="research-card-top">

                    <span class="research-category">
                        POLAR RESEARCH
                    </span>

                    <span class="research-year">
                        ${research.year || ""}
                    </span>

                </div>


                <h3>
                    ${research.title || "Untitled Research"}
                </h3>


                <p>
                    ${research.abstract || "No abstract available."}
                </p>


                <div class="research-card-footer">

                    <span>
                        ${research.journal ||
                          research.authors ||
                          "Polar Research"}
                    </span>

                    ${
                        research.pdf_url
                        ? `
                            <a
                                href="${research.pdf_url}"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open research PDF"
                            >
                                →
                            </a>
                          `
                        : research.external_link
                        ? `
                            <a
                                href="${research.external_link}"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open research"
                            >
                                →
                            </a>
                          `
                        : `
                            <span class="research-no-link">
                                →
                            </span>
                          `
                    }

                </div>

            `;

            researchGrid.appendChild(card);

        });


        console.log(
            "Research loaded successfully:",
            researchData
        );


    } catch (error) {

        console.error(
            "Research API error:",
            error
        );

        researchGrid.innerHTML = `

            <div class="no-results">

                <p>
                    Unable to load research data.
                </p>

                <small>
                    Please try again later.
                </small>

            </div>

        `;
    }
}


// ==========================================
// LOAD RESEARCH
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadResearch
);