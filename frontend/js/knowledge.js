const KNOWLEDGE_API = `${API_BASE_URL}/knowledge/`;

let allKnowledgeData = [];
let currentKnowledgeData = [];

document.addEventListener("DOMContentLoaded", () => {
    loadKnowledge();
    setupCategoryFilters();
    setupKnowledgeSearch();
});

async function loadKnowledge() {
    const grid = document.querySelector(".resource-grid");

    if (!grid) return;

    grid.innerHTML = `
        <div class="loading-state">
            Loading knowledge resources...
        </div>
    `;

    try {
        const response = await fetch(KNOWLEDGE_API);

        if (!response.ok) {
            throw new Error(`Knowledge API error: ${response.status}`);
        }

        const data = await response.json();

        allKnowledgeData = Array.isArray(data)
            ? data
            : Array.isArray(data.results)
                ? data.results
                : [];

        allKnowledgeData = removeDuplicates(allKnowledgeData);
        currentKnowledgeData = [...allKnowledgeData];

        renderKnowledge(currentKnowledgeData);

    } catch (error) {
        console.error("Knowledge loading error:", error);

        grid.innerHTML = `
            <div class="empty-state">
                <h3>Unable to load knowledge resources</h3>
                <p>Please make sure the Django backend is running.</p>
            </div>
        `;
    }
}


/* REMOVE DUPLICATE RECORDS */

function removeDuplicates(items) {
    const seen = new Set();

    return items.filter(item => {
        const title = String(item.title || "").trim().toLowerCase();
        const description = String(
            item.description || item.abstract || ""
        ).trim().toLowerCase();

        const key = `${title}|${description}`;

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}


/* RENDER RESOURCES */

function renderKnowledge(items) {
    const grid = document.querySelector(".resource-grid");

    if (!grid) return;

    grid.innerHTML = "";

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>No resources found</h3>
                <p>
                    No resources are currently available for this category.
                </p>
            </div>
        `;

        updateCount(0);
        return;
    }

    items.forEach(item => {
        grid.insertAdjacentHTML(
            "beforeend",
            createResourceCard(item)
        );
    });

    updateCount(items.length);
}


/* CREATE RESOURCE CARD */

function createResourceCard(item) {
    const title = escapeHTML(
        item.title || "Untitled Resource"
    );

    const description = escapeHTML(
        item.description ||
        item.abstract ||
        "No description available."
    );

    const category = escapeHTML(
        item.category || "Polar Science"
    );

    const author = escapeHTML(
        item.author || "PolarConnect"
    );

    const date = escapeHTML(
        item.date || formatDate(item.created_at)
    );

    const image = item.image_url
        ? escapeAttribute(item.image_url)
        : "../assets/images/polar-hero-v2.png";

    const resourceUrl =
        item.file_url ||
        item.external_link ||
        item.url ||
        "";

    let action;

    if (resourceUrl) {
        action = `
            <a
                href="${escapeAttribute(resourceUrl)}"
                class="read-more"
                target="_blank"
                rel="noopener noreferrer"
            >
                Open Resource →
            </a>
        `;
    } else {
        action = `
            <button
                type="button"
                class="read-more resource-info-button"
                data-title="${escapeAttribute(
                    item.title || "Resource"
                )}"
                data-description="${escapeAttribute(
                    item.description ||
                    item.abstract ||
                    "No additional information is available."
                )}"
                data-category="${escapeAttribute(
                    item.category || "Polar Science"
                )}"
                data-author="${escapeAttribute(
                    item.author || "PolarConnect"
                )}"
            >
                View Information →
            </button>
        `;
    }

    return `
        <article class="resource-card">

            <div class="card-image">
                <img
                    src="${image}"
                    alt="${title}"
                    loading="lazy"
                    onerror="this.src='../assets/images/polar-hero-v2.png'"
                >

                <span class="card-category">
                    ${category}
                </span>
            </div>

            <div class="card-body">

                <div class="meta">
                    ${category}
                </div>

                <h3>${title}</h3>

                <p>${description}</p>

                <div class="resource-details">
                    <span>${author}</span>
                    ${date ? `<span>${date}</span>` : ""}
                </div>

                ${action}

            </div>

        </article>
    `;
}


/* CATEGORY BUTTONS */

function setupCategoryFilters() {
    const buttons = document.querySelectorAll(
        ".category-tabs button[data-category]"
    );

    if (!buttons.length) {
        console.warn("Knowledge category buttons not found.");
        return;
    }

    buttons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const category =
                String(
                    button.dataset.category || "all"
                ).toLowerCase();

            // Active button
            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            // Filter
            if (category === "all") {
                currentKnowledgeData = [
                    ...allKnowledgeData
                ];
            } else {
                currentKnowledgeData =
                    allKnowledgeData.filter(item =>
                        matchesCategory(item, category)
                    );
            }

            // Display information
            renderKnowledge(currentKnowledgeData);

            // Automatically move to resources
            const library =
                document.querySelector(".resource-library");

            if (library) {
                setTimeout(() => {
                    library.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 100);
            }
        });
    });
}


/* CATEGORY MATCHING */

function matchesCategory(item, category) {

    const categoryText =
        String(item.category || "").toLowerCase();

    const title =
        String(item.title || "").toLowerCase();

    const description =
        String(
            item.description ||
            item.abstract ||
            ""
        ).toLowerCase();

    const text =
        `${categoryText} ${title} ${description}`;

    const keywords = {

        climate: [
            "climate",
            "warming",
            "temperature",
            "atmosphere",
            "weather"
        ],

        ice: [
            "ice",
            "glacier",
            "glaciers",
            "ice sheet",
            "iceberg",
            "snow",
            "cryosphere"
        ],

        oceans: [
            "ocean",
            "oceans",
            "marine",
            "sea",
            "arctic ocean",
            "antarctic ocean"
        ],

        wildlife: [
            "wildlife",
            "penguin",
            "seal",
            "whale",
            "polar bear",
            "animal",
            "species",
            "biodiversity",
            "ecosystem"
        ]
    };

    return (keywords[category] || []).some(keyword =>
        text.includes(keyword)
    );
}


/* SEARCH */

function setupKnowledgeSearch() {

    const input =
        document.querySelector(".knowledge-search input");

    const searchButton =
        document.querySelector("#search-btn");

    if (!input) return;

    function performSearch() {

        const query =
            input.value.trim().toLowerCase();

        if (!query) {
            currentKnowledgeData =
                [...allKnowledgeData];

            renderKnowledge(currentKnowledgeData);

            scrollToLibrary();

            return;
        }

        const results =
            allKnowledgeData.filter(item => {

                const text = `
                    ${item.title || ""}
                    ${item.description || ""}
                    ${item.abstract || ""}
                    ${item.category || ""}
                    ${item.author || ""}
                `.toLowerCase();

                return text.includes(query);
            });

        currentKnowledgeData = results;

        renderKnowledge(results);

        scrollToLibrary();
    }

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
        }
    });

    if (searchButton) {
        searchButton.addEventListener(
            "click",
            performSearch
        );
    }
}


/* SCROLL TO RESOURCE LIBRARY */

function scrollToLibrary() {

    const library =
        document.querySelector(".resource-library");

    if (library) {
        library.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


/* RESOURCE INFORMATION BUTTON */

document.addEventListener("click", event => {

    const button =
        event.target.closest(
            ".resource-info-button"
        );

    if (!button) return;

    const title =
        button.dataset.title || "Resource";

    const description =
        button.dataset.description ||
        "No description available.";

    const category =
        button.dataset.category ||
        "Polar Science";

    const author =
        button.dataset.author ||
        "PolarConnect";

    alert(
        `${title}\n\n` +
        `${description}\n\n` +
        `Category: ${category}\n` +
        `Author: ${author}`
    );
});


/* RESOURCE COUNT */

function updateCount(count) {

    const countElement =
        document.querySelector(".library-count strong");

    if (countElement) {
        countElement.textContent = count;
    }
}


/* DATE */

function formatDate(value) {

    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString();
}


/* SECURITY */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {
    return escapeHTML(value);
}