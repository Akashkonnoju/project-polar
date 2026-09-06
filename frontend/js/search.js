// ==========================================
// POLAR SCIENCE PORTAL - GLOBAL SEARCH
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("global-search");
    const searchButton = document.getElementById("search-btn");
    const resultsContainer = document.getElementById("search-results");

    if (!searchInput || !searchButton) {
        console.error("Search elements not found.");
        return;
    }


    // ==========================================
    // SEARCH BUTTON
    // ==========================================

    searchButton.addEventListener("click", () => {

        const query = searchInput.value.trim();

        if (!query) {
            return;
        }

        // If this is the Knowledge page,
        // redirect to the search results page.
        if (!resultsContainer) {

            window.location.href =
                `search.html?q=${encodeURIComponent(query)}`;

            return;
        }

        // If already on search.html,
        // perform the actual API search.
        performSearch(query);
    });


    // ==========================================
    // ENTER KEY
    // ==========================================

    searchInput.addEventListener("keydown", (event) => {

        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        const query = searchInput.value.trim();

        if (!query) {
            return;
        }

        if (!resultsContainer) {

            window.location.href =
                `search.html?q=${encodeURIComponent(query)}`;

            return;
        }

        performSearch(query);
    });


    // ==========================================
    // PERFORM API SEARCH
    // ==========================================

    async function performSearch(query) {

        resultsContainer.innerHTML = `
            <p>Searching for "${query}"...</p>
        `;

        try {

            const response = await searchContent(query);

            console.log("Search API response:", response);

            const knowledge = response.knowledge || [];
            const research = response.research || [];
            const media = response.media || [];
            const locations = response.locations || [];

            const totalResults =
                knowledge.length +
                research.length +
                media.length +
                locations.length;


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


            let html = `

                <div class="search-result-heading">

                    <span>SEARCH RESULTS</span>

                    <h3>
                        Results for "${query}"
                    </h3>

                </div>

            `;


            // ==========================================
            // KNOWLEDGE
            // ==========================================

            if (knowledge.length > 0) {

                html += `
                    <div class="search-category">
                        <h4>Knowledge</h4>
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
            // RESEARCH
            // ==========================================

            if (research.length > 0) {

                html += `
                    <div class="search-category">
                        <h4>Research</h4>
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
            // MEDIA
            // ==========================================

            if (media.length > 0) {

                html += `
                    <div class="search-category">
                        <h4>Media</h4>
                `;

                media.forEach(item => {

                    html += `
                        <article class="search-result">

                            <span class="result-type">
                                ${(item.media_type || "MEDIA").toUpperCase()}
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
            // LOCATIONS
            // ==========================================

            if (locations.length > 0) {

                html += `
                    <div class="search-category">
                        <h4>Polar Locations</h4>
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
                                    ? `<small>Region: ${item.region}</small>`
                                    : ""
                            }

                        </article>
                    `;

                });

                html += `</div>`;
            }


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
    // AUTO SEARCH FROM URL
    // ==========================================

    if (resultsContainer) {

        const params = new URLSearchParams(window.location.search);
        const query = params.get("q");

        if (query) {

            searchInput.value = query;
            performSearch(query);

        }

    }

});