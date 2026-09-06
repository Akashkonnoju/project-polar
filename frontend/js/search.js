// ==========================================
// POLARCONNECT - GLOBAL SEARCH
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("global-search");
    const searchButton = document.getElementById("search-btn");
    const resultsContainer = document.getElementById("search-results");

    if (!searchInput || !searchButton || !resultsContainer) {
        console.error("Search elements not found.");
        return;
    }


    // ==========================================
    // ESCAPE HTML
    // ==========================================

    function escapeHTML(value) {

        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    // ==========================================
    // REMOVE DUPLICATES
    // ==========================================

    function removeDuplicates(items, type) {

        const seen = new Set();

        return items.filter(item => {

            const id = item.id
                ? `${type}-id-${item.id}`
                : `${type}-${(
                    item.title ||
                    item.name ||
                    ""
                ).toLowerCase()}-${(
                    item.description ||
                    item.abstract ||
                    ""
                ).toLowerCase()}`;

            if (seen.has(id)) {
                return false;
            }

            seen.add(id);

            return true;
        });
    }


    // ==========================================
    // RENDER KNOWLEDGE
    // ==========================================

    function renderKnowledge(items) {

        if (!items.length) {
            return "";
        }

        let html = `
            <section class="search-category">

                <div class="category-heading">
                    <span class="category-line"></span>
                    <h4>Knowledge</h4>
                </div>

                <div class="search-results-grid">
        `;

        items.forEach(item => {

            html += `
                <article class="search-result">

                    <span class="result-type">
                        KNOWLEDGE
                    </span>

                    <h3>
                        ${escapeHTML(
                            item.title || "Untitled Knowledge"
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            item.description ||
                            "No description available."
                        )}
                    </p>

                    ${
                        item.author
                            ? `
                                <div class="result-meta">
                                    Author: ${escapeHTML(item.author)}
                                </div>
                              `
                            : ""
                    }

                    ${
                        item.category
                            ? `
                                <div class="result-meta">
                                    Category: ${escapeHTML(item.category)}
                                </div>
                              `
                            : ""
                    }

                </article>
            `;
        });

        html += `
                </div>
            </section>
        `;

        return html;
    }


    // ==========================================
    // RENDER RESEARCH
    // ==========================================

    function renderResearch(items) {

        if (!items.length) {
            return "";
        }

        let html = `
            <section class="search-category">

                <div class="category-heading">
                    <span class="category-line"></span>
                    <h4>Research</h4>
                </div>

                <div class="search-results-grid">
        `;

        items.forEach(item => {

            html += `
                <article class="search-result">

                    <span class="result-type">
                        RESEARCH
                    </span>

                    <h3>
                        ${escapeHTML(
                            item.title || "Untitled Research"
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            item.abstract ||
                            "No abstract available."
                        )}
                    </p>

                    ${
                        item.authors
                            ? `
                                <div class="result-meta">
                                    Authors: ${escapeHTML(item.authors)}
                                </div>
                              `
                            : ""
                    }

                    ${
                        item.year
                            ? `
                                <div class="result-meta">
                                    Year: ${escapeHTML(item.year)}
                                </div>
                              `
                            : ""
                    }

                    ${
                        item.journal
                            ? `
                                <div class="result-meta">
                                    Journal: ${escapeHTML(item.journal)}
                                </div>
                              `
                            : ""
                    }

                    ${
                        item.pdf_url
                            ? `
                                <a
                                    class="result-link"
                                    href="${escapeHTML(item.pdf_url)}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Research →
                                </a>
                              `
                            : ""
                    }

                </article>
            `;
        });

        html += `
                </div>
            </section>
        `;

        return html;
    }


    // ==========================================
    // RENDER MEDIA
    // ==========================================

    function renderMedia(items) {

        if (!items.length) {
            return "";
        }

        let html = `
            <section class="search-category">

                <div class="category-heading">
                    <span class="category-line"></span>
                    <h4>Media</h4>
                </div>

                <div class="search-results-grid">
        `;

        items.forEach(item => {

            html += `
                <article class="search-result">

                    <span class="result-type">
                        ${escapeHTML(
                            (
                                item.media_type ||
                                "MEDIA"
                            ).toUpperCase()
                        )}
                    </span>

                    <h3>
                        ${escapeHTML(
                            item.title || "Untitled Media"
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            item.description ||
                            "No description available."
                        )}
                    </p>

                    ${
                        item.date
                            ? `
                                <div class="result-meta">
                                    Date: ${escapeHTML(item.date)}
                                </div>
                              `
                            : ""
                    }

                    ${
                        item.media_url
                            ? `
                                <a
                                    class="result-link"
                                    href="${escapeHTML(item.media_url)}"
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

        html += `
                </div>
            </section>
        `;

        return html;
    }


    // ==========================================
    // RENDER LOCATIONS
    // ==========================================

    function renderLocations(items) {

        if (!items.length) {
            return "";
        }

        let html = `
            <section class="search-category">

                <div class="category-heading">
                    <span class="category-line"></span>
                    <h4>Polar Locations</h4>
                </div>

                <div class="search-results-grid">
        `;

        items.forEach(item => {

            html += `
                <article class="search-result">

                    <span class="result-type">
                        LOCATION
                    </span>

                    <h3>
                        ${escapeHTML(
                            item.name ||
                            "Unnamed Location"
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            item.description ||
                            "No description available."
                        )}
                    </p>

                    ${
                        item.region
                            ? `
                                <div class="result-meta">
                                    Region: ${escapeHTML(item.region)}
                                </div>
                              `
                            : ""
                    }

                    ${
                        item.latitude !== undefined &&
                        item.longitude !== undefined
                            ? `
                                <div class="result-meta">
                                    Coordinates:
                                    ${escapeHTML(item.latitude)},
                                    ${escapeHTML(item.longitude)}
                                </div>
                              `
                            : ""
                    }

                </article>
            `;
        });

        html += `
                </div>
            </section>
        `;

        return html;
    }


    // ==========================================
    // PERFORM SEARCH
    // ==========================================

    async function performSearch(queryFromURL = null) {

        const query = (
            queryFromURL !== null
                ? queryFromURL
                : searchInput.value
        ).trim();


        if (!query) {

            resultsContainer.innerHTML = `
                <div class="search-no-results">

                    <div class="no-results-icon">
                        ⌕
                    </div>

                    <h3>
                        Start your search
                    </h3>

                    <p>
                        Enter a keyword to explore
                        polar science resources.
                    </p>

                </div>
            `;

            return;
        }


        searchInput.value = query;


        resultsContainer.innerHTML = `
            <div class="search-loading">
                Searching the polar repository...
            </div>
        `;


        try {

            const response = await searchContent(query);

            console.log(
                "Search API response:",
                response
            );


            let knowledge = Array.isArray(response.knowledge)
                ? response.knowledge
                : [];

            let research = Array.isArray(response.research)
                ? response.research
                : [];

            let media = Array.isArray(response.media)
                ? response.media
                : [];

            let locations = Array.isArray(response.locations)
                ? response.locations
                : [];


            // Remove duplicate records

            knowledge = removeDuplicates(
                knowledge,
                "knowledge"
            );

            research = removeDuplicates(
                research,
                "research"
            );

            media = removeDuplicates(
                media,
                "media"
            );

            locations = removeDuplicates(
                locations,
                "locations"
            );


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

                        <div class="no-results-icon">
                            ⌕
                        </div>

                        <h3>
                            No results found
                        </h3>

                        <p>
                            We couldn't find anything
                            matching
                            <strong>
                                "${escapeHTML(query)}"
                            </strong>.
                        </p>

                        <span>
                            Try another keyword such as
                            climate, ice, ocean or Antarctica.
                        </span>

                    </div>
                `;

                return;
            }


            // ==========================================
            // RESULTS HEADER
            // ==========================================

            let html = `

                <div class="search-result-heading">

                    <span class="heading-small">
                        SEARCH RESULTS
                    </span>

                    <h3>
                        Results for
                        <span>"${escapeHTML(query)}"</span>
                    </h3>

                    <p class="result-count">
                        ${totalResults}
                        result${totalResults !== 1 ? "s" : ""}
                        found
                    </p>

                </div>

            `;


            // ==========================================
            // ADD SECTIONS
            // ==========================================

            html += renderKnowledge(knowledge);

            html += renderResearch(research);

            html += renderMedia(media);

            html += renderLocations(locations);


            resultsContainer.innerHTML = html;


            console.log(
                `Search completed: ${totalResults} unique result(s)`
            );

        } catch (error) {

            console.error(
                "Search API error:",
                error
            );

            resultsContainer.innerHTML = `
                <div class="search-error">

                    <h3>
                        Search unavailable
                    </h3>

                    <p>
                        Unable to connect to the
                        polar science search service.
                    </p>

                    <span>
                        Please make sure the Django
                        backend is running.
                    </span>

                </div>
            `;
        }
    }


    // ==========================================
    // SEARCH BUTTON
    // ==========================================

    searchButton.addEventListener(
        "click",
        () => {
            performSearch();
        }
    );


    // ==========================================
    // ENTER KEY
    // ==========================================

    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();
            }

        }
    );


    // ==========================================
    // LOAD QUERY FROM URL
    // ==========================================

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const urlQuery =
        urlParams.get("q");


    if (urlQuery) {

        performSearch(urlQuery);

    } else {

        resultsContainer.innerHTML = `
            <div class="search-no-results">

                <div class="no-results-icon">
                    ⌕
                </div>

                <h3>
                    Search the Polar Repository
                </h3>

                <p>
                    Search across Knowledge,
                    Research, Media and Polar Locations.
                </p>

            </div>
        `;
    }

});