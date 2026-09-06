// ==========================================
// POLAR SCIENCE PORTAL - GLOBAL SEARCH
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("global-search");
    const searchButton = document.getElementById("search-btn");
    const resultsContainer = document.getElementById("search-results");

    // Check whether search elements exist
    if (!searchInput || !searchButton || !resultsContainer) {
        console.error("Search elements not found.");
        return;
    }


    // ==========================================
    // PERFORM SEARCH
    // ==========================================

    async function performSearch() {

        const query = searchInput.value.trim();

        // Empty search
        if (!query) {

            resultsContainer.innerHTML = `
                <p>Please enter something to search.</p>
            `;

            return;
        }


        // Show loading message
        resultsContainer.innerHTML = `
            <p>Searching for "${query}"...</p>
        `;


        try {

            const response = await searchContent(query);

            console.log("Search API response:", response);


            // ==========================================
            // GET RESULTS FROM API
            // ==========================================

            const knowledge = response.knowledge || [];
            const research = response.research || [];
            const media = response.media || [];
            const locations = response.locations || [];


            const totalResults =
                knowledge.length +
                research.length +
                media.length +
                locations.length;


            // ==========================================
            // NO RESULTS
            // ==========================================

            if (totalResults === 0) {

                resultsContainer.innerHTML = `
                    <div class="search-no-results">

                        <h3>No results found</h3>

                        <p>
                            No polar science resources were found
                            for "${query}".
                        </p>

                    </div>
                `;

                return;
            }


            // ==========================================
            // BUILD RESULTS
            // ==========================================

            let html = `

                <div class="search-result-heading">

                    <span>SEARCH RESULTS</span>

                    <h3>
                        Results for "${query}"
                    </h3>

                </div>

            `;


            // ==========================================
            // KNOWLEDGE RESULTS
            // ==========================================

            if (knowledge.length > 0) {

                html += `

                    <div class="search-category">

                        <h4>
                            Knowledge
                        </h4>

                `;


                knowledge.forEach(item => {

                    html += `

                        <article class="search-result">

                            <span class="result-type">
                                KNOWLEDGE
                            </span>

                            <h3>
                                ${item.title || "Untitled Knowledge"}
                            </h3>

                            <p>
                                ${item.description || "No description available."}
                            </p>

                            ${
                                item.author
                                    ? `<small>Author: ${item.author}</small>`
                                    : ""
                            }

                        </article>

                    `;

                });


                html += `</div>`;
            }


            // ==========================================
            // RESEARCH RESULTS
            // ==========================================

            if (research.length > 0) {

                html += `

                    <div class="search-category">

                        <h4>
                            Research
                        </h4>

                `;


                research.forEach(item => {

                    html += `

                        <article class="search-result">

                            <span class="result-type">
                                RESEARCH
                            </span>

                            <h3>
                                ${item.title || "Untitled Research"}
                            </h3>

                            <p>
                                ${item.abstract || "No abstract available."}
                            </p>

                            ${
                                item.authors
                                    ? `<small>Authors: ${item.authors}</small>`
                                    : ""
                            }

                        </article>

                    `;

                });


                html += `</div>`;
            }


            // ==========================================
            // MEDIA RESULTS
            // ==========================================

            if (media.length > 0) {

                html += `

                    <div class="search-category">

                        <h4>
                            Media
                        </h4>

                `;


                media.forEach(item => {

                    html += `

                        <article class="search-result">

                            <span class="result-type">
                                ${(
                                    item.media_type ||
                                    "MEDIA"
                                ).toUpperCase()}
                            </span>

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
                                            View Media →
                                        </a>
                                    `
                                    : ""
                            }

                        </article>

                    `;

                });


                html += `</div>`;
            }


            // ==========================================
            // LOCATION RESULTS
            // ==========================================

            if (locations.length > 0) {

                html += `

                    <div class="search-category">

                        <h4>
                            Polar Locations
                        </h4>

                `;


                locations.forEach(item => {

                    html += `

                        <article class="search-result">

                            <span class="result-type">
                                LOCATION
                            </span>

                            <h3>
                                ${item.name || "Unnamed Location"}
                            </h3>

                            <p>
                                ${item.description || "No description available."}
                            </p>

                            ${
                                item.region
                                    ? `
                                        <small>
                                            Region: ${item.region}
                                        </small>
                                    `
                                    : ""
                            }

                            ${
                                item.latitude !== undefined &&
                                item.longitude !== undefined
                                    ? `
                                        <small>
                                            Coordinates:
                                            ${item.latitude},
                                            ${item.longitude}
                                        </small>
                                    `
                                    : ""
                            }

                        </article>

                    `;

                });


                html += `</div>`;
            }


            // ==========================================
            // DISPLAY RESULTS
            // ==========================================

            resultsContainer.innerHTML = html;

            console.log(
                `Search completed: ${totalResults} result(s)`
            );

        } catch (error) {

            console.error("Search API error:", error);

            resultsContainer.innerHTML = `

                <div class="search-error">

                    <h3>
                        Search unavailable
                    </h3>

                    <p>
                        Unable to connect to the polar
                        science search service.
                    </p>

                </div>

            `;
        }

    }


    // ==========================================
    // SEARCH BUTTON
    // ==========================================

    searchButton.addEventListener(
        "click",
        performSearch
    );


    // ==========================================
    // ENTER KEY
    // ==========================================

    searchInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {
                performSearch();
            }

        }
    );

});