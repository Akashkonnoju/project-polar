// ============================================================
// POLARCONNECT
// KNOWLEDGE PAGE
// ============================================================

const API_BASE =
    typeof API_BASE_URL !== "undefined"
        ? API_BASE_URL
        : "http://127.0.0.1:8000/api";

const KNOWLEDGE_API = `${API_BASE}/knowledge/`;

let allKnowledgeData = [];
let activeCategory = "all";
let activeSearch = "";


// ============================================================
// POLAR IMAGE DATA
// ============================================================

const resourceImages = [

    // CLIMATE
    "https://images.unsplash.com/photo-1746310005142-21ca9368e70a?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1651869987248-921b90dd24ee?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1606592641984-c9a1506d0705?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1786335091902-eb0166246cbe?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1557238687-f10be4e702ae?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1695410864552-1beee4a65bf7?auto=format&fit=crop&w=1000&q=82",

    // ICE
    "https://images.unsplash.com/photo-1783101276898-53cdd84174dc?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1780589613719-5642667970ec?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1529730705273-7f8ab24844e8?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1778608256843-d69885cb17ca?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1780945009788-44907a755766?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1777824256452-626a33fc7190?auto=format&fit=crop&w=1000&q=82",

    // POLAR OCEANS
    "https://images.unsplash.com/photo-1670174023730-966d23eb891a?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1781454706956-02465c66c420?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1737993705942-bff77b62b416?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1722166151666-a1d0af6049ea?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1779534783522-08ef3f53a5f3?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1746310005142-21ca9368e70a?auto=format&fit=crop&w=1000&q=82&sat=-5",

    // WILDLIFE
    "https://images.unsplash.com/photo-1722695313533-30013ce2f168?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1654801530070-5702ed0089d6?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1739832208797-c79303b24257?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1778080832056-2f7b59519816?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1584268904283-8832048ef10c?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1695410864552-1beee4a65bf7?auto=format&fit=crop&w=1000&q=82&sat=-5"
];


// ============================================================
// LOCAL RESOURCES
// ============================================================

const localKnowledgeData = [

    {
        id: "climate-1",
        title: "Polar Climate Systems",
        description:
            "Learn how temperature, atmospheric circulation, solar radiation and ocean processes control climate conditions in polar regions.",
        author: "NASA Earth Science",
        category: "climate",
        published: "2024",
        image: resourceImages[0]
    },

    {
        id: "climate-2",
        title: "Climate Change in the Arctic",
        description:
            "Explore changes in Arctic temperature, precipitation, sea ice and ecosystems and understand how the Arctic climate is changing.",
        author: "NOAA Arctic Research",
        category: "climate",
        published: "2024",
        image: resourceImages[1]
    },

    {
        id: "climate-3",
        title: "Antarctic Climate Research",
        description:
            "Discover how scientists study Antarctic atmospheric conditions, temperature patterns and long-term climate variations.",
        author: "British Antarctic Survey",
        category: "climate",
        published: "2023",
        image: resourceImages[2]
    },

    {
        id: "climate-4",
        title: "Polar Atmospheric Processes",
        description:
            "Understand atmospheric circulation, clouds, winds and energy transfer that influence weather and climate at the poles.",
        author: "National Center for Atmospheric Research",
        category: "climate",
        published: "2023",
        image: resourceImages[3]
    },

    {
        id: "climate-5",
        title: "Polar Research Stations",
        description:
            "Explore how scientific stations collect climate observations and support long-term polar environmental research.",
        author: "Polar Research Community",
        category: "climate",
        published: "2025",
        image: resourceImages[4]
    },

    {
        id: "climate-6",
        title: "Greenland Climate Observations",
        description:
            "Learn about climate observations from Greenland and how scientists monitor temperature, snow and environmental change.",
        author: "Polar Climate Research",
        category: "climate",
        published: "2025",
        image: resourceImages[5]
    },


    // ICE

    {
        id: "ice-1",
        title: "Ice Sheets and Glaciers",
        description:
            "Understand the structure of ice sheets and glaciers and learn why they are important indicators of environmental change.",
        author: "National Snow and Ice Data Center",
        category: "ice & glaciers",
        published: "2024",
        image: resourceImages[6]
    },

    {
        id: "ice-2",
        title: "Sea Ice and Polar Regions",
        description:
            "Explore the formation, movement and seasonal changes of sea ice across Arctic and Antarctic waters.",
        author: "NASA Earth Observatory",
        category: "ice & glaciers",
        published: "2024",
        image: resourceImages[7]
    },

    {
        id: "ice-3",
        title: "Glacier Dynamics",
        description:
            "Learn how glaciers move, advance and retreat and how researchers measure changes in glacier systems.",
        author: "United States Geological Survey",
        category: "ice & glaciers",
        published: "2023",
        image: resourceImages[8]
    },

    {
        id: "ice-4",
        title: "Antarctic Ice Shelves",
        description:
            "Discover the role of Antarctic ice shelves and how their changes can affect ice flow and sea-level rise.",
        author: "British Antarctic Survey",
        category: "ice & glaciers",
        published: "2024",
        image: resourceImages[9]
    },

    {
        id: "ice-5",
        title: "Satellite Observation of Polar Ice",
        description:
            "Explore how satellites are used to observe sea ice, glaciers, ice sheets and changes across remote polar regions.",
        author: "European Space Agency",
        category: "ice & glaciers",
        published: "2024",
        image: resourceImages[10]
    },

    {
        id: "ice-6",
        title: "Antarctic Ice Sheet",
        description:
            "Learn about the Antarctic ice sheet, its enormous ice volume and the scientific methods used to monitor it.",
        author: "Polar Ice Research Community",
        category: "ice & glaciers",
        published: "2025",
        image: resourceImages[11]
    },


    // OCEANS

    {
        id: "ocean-1",
        title: "Polar Ocean Systems",
        description:
            "Explore the physical characteristics, circulation and environmental processes of the Arctic and Antarctic oceans.",
        author: "NOAA Ocean Service",
        category: "polar oceans",
        published: "2024",
        image: resourceImages[12]
    },

    {
        id: "ocean-2",
        title: "Arctic and Antarctic Oceans",
        description:
            "Learn about the major characteristics and environmental conditions of Earth's polar oceans.",
        author: "National Oceanic and Atmospheric Administration",
        category: "polar oceans",
        published: "2023",
        image: resourceImages[13]
    },

    {
        id: "ocean-3",
        title: "Ocean Circulation in Polar Regions",
        description:
            "Understand how currents transport heat, nutrients and water throughout polar ocean systems.",
        author: "Woods Hole Oceanographic Institution",
        category: "polar oceans",
        published: "2023",
        image: resourceImages[14]
    },

    {
        id: "ocean-4",
        title: "Polar Marine Ecosystems",
        description:
            "Explore marine ecosystems and the organisms that depend on Arctic and Antarctic ocean environments.",
        author: "Alfred Wegener Institute",
        category: "polar oceans",
        published: "2024",
        image: resourceImages[15]
    },

    {
        id: "ocean-5",
        title: "Polar Ocean Observation",
        description:
            "Explore how researchers collect ocean temperature, salinity, current and biological observations in polar waters.",
        author: "National Institute of Ocean Technology",
        category: "polar oceans",
        published: "2025",
        image: resourceImages[16]
    },

    {
        id: "ocean-6",
        title: "Life Beneath Polar Oceans",
        description:
            "Discover the unique marine organisms and ecosystems that survive in extremely cold polar waters.",
        author: "Polar Marine Research Community",
        category: "polar oceans",
        published: "2025",
        image: resourceImages[17]
    },


    // WILDLIFE

    {
        id: "wildlife-1",
        title: "Life at the Poles",
        description:
            "Explore animals and organisms adapted to some of the coldest environments on Earth.",
        author: "PolarConnect Research Team",
        category: "wildlife",
        published: "2026",
        image: resourceImages[18]
    },

    {
        id: "wildlife-2",
        title: "Polar Wildlife and Ecosystems",
        description:
            "Learn how polar animals interact with their environment and depend on sea ice, oceans and land ecosystems.",
        author: "PolarConnect Research Team",
        category: "wildlife",
        published: "2026",
        image: resourceImages[19]
    },

    {
        id: "wildlife-3",
        title: "Arctic Wildlife",
        description:
            "Discover polar bears, Arctic foxes, seals and other wildlife adapted to the Arctic environment.",
        author: "Arctic Research Community",
        category: "wildlife",
        published: "2024",
        image: resourceImages[20]
    },

    {
        id: "wildlife-4",
        title: "Antarctic Penguins",
        description:
            "Explore penguin species, their habitats and adaptations to Antarctic marine environments.",
        author: "Australian Antarctic Division",
        category: "wildlife",
        published: "2024",
        image: resourceImages[21]
    },

    {
        id: "wildlife-5",
        title: "Polar Biodiversity",
        description:
            "Explore the diversity of animals and organisms found across Arctic and Antarctic environments.",
        author: "International Polar Research Community",
        category: "wildlife",
        published: "2025",
        image: resourceImages[22]
    },

    {
        id: "wildlife-6",
        title: "Marine Polar Animals",
        description:
            "Learn about seals, whales, walruses and other marine animals that live in polar waters.",
        author: "Polar Wildlife Research",
        category: "wildlife",
        published: "2025",
        image: resourceImages[23]
    }
];


// ============================================================
// PAGE START
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    allKnowledgeData = [...localKnowledgeData];

    renderResources();

    setupSearch();
    setupFilters();
    setupModal();

    loadBackendResources();

});


// ============================================================
// LOAD BACKEND RESOURCES
// ============================================================

async function loadBackendResources() {

    try {

        const response = await fetch(KNOWLEDGE_API);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        let backendResources = [];

        if (Array.isArray(data)) {
            backendResources = data;
        }

        else if (Array.isArray(data.results)) {
            backendResources = data.results;
        }

        else if (Array.isArray(data.data)) {
            backendResources = data.data;
        }

        const formatted =
            backendResources.map(
                (item, index) =>
                    normalizeBackendResource(item, index)
            );

        allKnowledgeData =
            mergeResources(
                formatted,
                localKnowledgeData
            );

        renderResources();

    }

    catch (error) {

        console.warn(
            "Knowledge API unavailable. Using local resources.",
            error
        );

    }

}


// ============================================================
// NORMALIZE BACKEND RESOURCE
// ============================================================

function normalizeBackendResource(item, index) {

    return {

        id:
            item.id ||
            `backend-${index}`,

        title:
            item.title ||
            item.name ||
            "Polar Science Resource",

        description:
            item.description ||
            item.abstract ||
            item.summary ||
            "No description available.",

        author:
            item.author ||
            item.creator ||
            item.source ||
            "Polar Science Research",

        category:
            normalizeCategory(
                item.category ||
                item.topic ||
                ""
            ),

        published:
            item.published ||
            item.published_date ||
            item.date ||
            "N/A",

        image:
            item.image_url ||
            item.image ||
            item.thumbnail ||
            null
    };
}


// ============================================================
// MERGE RESOURCES
// ============================================================

function mergeResources(backend, local) {

    const result = [];
    const titles = new Set();

    backend.forEach(item => {

        const title =
            String(item.title || "")
                .trim()
                .toLowerCase();

        if (title && !titles.has(title)) {

            titles.add(title);
            result.push(item);

        }

    });

    local.forEach(item => {

        const title =
            String(item.title || "")
                .trim()
                .toLowerCase();

        if (title && !titles.has(title)) {

            titles.add(title);
            result.push(item);

        }

    });

    return result;
}


// ============================================================
// SEARCH
// ============================================================

function setupSearch() {

    const form =
        document.querySelector(
            "#knowledge-search-form"
        );

    const input =
        document.querySelector(
            "#knowledge-search"
        );

    const button =
        document.querySelector(
            "#knowledge-search-button"
        );


    if (!input) {

        console.error(
            "Knowledge search input not found."
        );

        return;
    }


    // --------------------------------------------------------
    // SEARCH FUNCTION
    // --------------------------------------------------------

    function performSearch(event) {

        if (event) {
            event.preventDefault();
        }

        activeSearch =
            input.value
                .trim()
                .toLowerCase();


        renderResources();


        // Move to results
        const results =
            document.querySelector(
                "#knowledge-resources"
            );

        if (results) {

            results.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    // --------------------------------------------------------
    // FORM SUBMIT
    // --------------------------------------------------------

    if (form) {

        form.addEventListener(
            "submit",
            performSearch
        );

    }


    // --------------------------------------------------------
    // BUTTON
    // --------------------------------------------------------

    if (button) {

        button.addEventListener(
            "click",
            performSearch
        );

    }


    // --------------------------------------------------------
    // LIVE SEARCH
    // --------------------------------------------------------

    input.addEventListener(
        "input",
        () => {

            activeSearch =
                input.value
                    .trim()
                    .toLowerCase();

            renderResources();

        }
    );

}


// ============================================================
// FILTERS
// ============================================================

function setupFilters() {

    const buttons =
        document.querySelectorAll(
            ".knowledge-filter"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                activeCategory =
                    normalizeCategory(
                        button.dataset.category
                    );


                renderResources();


                document
                    .querySelector(
                        "#knowledge-resources"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }
        );

    });

}


// ============================================================
// RENDER RESOURCES
// ============================================================

function renderResources() {

    const grid =
        document.querySelector(
            "#knowledge-resource-grid"
        );


    if (!grid) {

        console.error(
            "Knowledge resource grid not found."
        );

        return;
    }


    const filtered =
        allKnowledgeData.filter(
            resource => {

                const categoryMatch =
                    activeCategory === "all" ||
                    normalizeCategory(
                        resource.category
                    ) === activeCategory;


                if (!categoryMatch) {
                    return false;
                }


                if (!activeSearch) {
                    return true;
                }


                const searchableText = [

                    resource.title,

                    resource.description,

                    resource.author,

                    resource.category,

                    resource.published

                ]
                    .join(" ")
                    .toLowerCase();


                return searchableText.includes(
                    activeSearch
                );

            }
        );


    grid.innerHTML = "";


    if (filtered.length === 0) {

        grid.innerHTML = `

            <div class="knowledge-no-results">

                <h3>No resources found</h3>

                <p>
                    No polar resources match
                    "<strong>${escapeHtml(activeSearch)}</strong>".
                </p>

                <button
                    type="button"
                    id="clear-knowledge-search"
                >
                    Clear Search
                </button>

            </div>

        `;


        document
            .querySelector(
                "#clear-knowledge-search"
            )
            ?.addEventListener(
                "click",
                () => {

                    const input =
                        document.querySelector(
                            "#knowledge-search"
                        );

                    if (input) {
                        input.value = "";
                    }

                    activeSearch = "";

                    renderResources();

                }
            );


        return;
    }


    filtered.forEach(
        (resource, index) => {

            grid.appendChild(
                createResourceCard(
                    resource,
                    index
                )
            );

        }
    );

}


// ============================================================
// RESOURCE CARD
// ============================================================

function createResourceCard(resource, index) {

    const card =
        document.createElement("article");


    card.className =
        "knowledge-card";


    const image =
        getResourceImage(
            resource,
            index
        );


    card.innerHTML = `

        <div class="knowledge-card-image">

            <img
                src="${escapeAttribute(image)}"
                alt="${escapeAttribute(resource.title)}"
                loading="lazy"
                decoding="async"
            >

            <span class="knowledge-card-category">
                ${escapeHtml(
                    formatCategory(
                        resource.category
                    )
                )}
            </span>

        </div>


        <div class="knowledge-card-body">

            <h3>
                ${escapeHtml(resource.title)}
            </h3>

            <p>
                ${escapeHtml(
                    truncate(
                        resource.description,
                        155
                    )
                )}
            </p>


            <div class="knowledge-card-meta">

                <span>
                    ${escapeHtml(
                        resource.author ||
                        "Unknown"
                    )}
                </span>

                <span>
                    ${escapeHtml(
                        resource.published ||
                        "N/A"
                    )}
                </span>

            </div>


            <button
                type="button"
                class="knowledge-view-btn"
            >
                View Information →
            </button>

        </div>
    `;


    card
        .querySelector(
            ".knowledge-view-btn"
        )
        ?.addEventListener(
            "click",
            () => openResourceModal(resource)
        );


    const img =
        card.querySelector("img");


    img?.addEventListener(
        "error",
        () => {

            img.onerror = null;

            img.src =
                categoryFallback(
                    resource.category
                );

        }
    );


    return card;
}


// ============================================================
// IMAGE
// ============================================================

function getResourceImage(resource, index) {

    if (
        resource.image &&
        isUsableImage(resource.image)
    ) {

        return resource.image;

    }


    const category =
        normalizeCategory(
            resource.category
        );


    const categoryImages = {

        "climate":
            resourceImages.slice(0, 6),

        "ice & glaciers":
            resourceImages.slice(6, 12),

        "polar oceans":
            resourceImages.slice(12, 18),

        "wildlife":
            resourceImages.slice(18, 24)

    };


    const images =
        categoryImages[category] ||
        resourceImages;


    return images[
        Math.abs(index) %
        images.length
    ];

}


// ============================================================
// CHECK IMAGE
// ============================================================

function isUsableImage(value) {

    if (!value) {
        return false;
    }


    const url =
        String(value).trim();


    if (!/^https?:\/\//i.test(url)) {
        return false;
    }


    const blocked = [

        "example.com",
        "example.org",
        "loremflickr.com",
        "via.placeholder.com"

    ];


    return !blocked.some(
        host =>
            url
                .toLowerCase()
                .includes(host)
    );

}


// ============================================================
// CATEGORY FALLBACK
// ============================================================

function categoryFallback(category) {

    const label =
        formatCategory(category);


    const colors = {

        "climate":
            ["#0b2845", "#4ba7c7"],

        "ice & glaciers":
            ["#0b3048", "#7ddfff"],

        "polar oceans":
            ["#062b46", "#287fa8"],

        "wildlife":
            ["#173a4d", "#78b9c8"]

    };


    const pair =
        colors[
            normalizeCategory(category)
        ] ||
        ["#102a43", "#79ddff"];


    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="550"
            viewBox="0 0 1000 550"
        >

            <defs>

                <linearGradient
                    id="g"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                >

                    <stop
                        offset="0%"
                        stop-color="${pair[0]}"
                    />

                    <stop
                        offset="100%"
                        stop-color="${pair[1]}"
                    />

                </linearGradient>

            </defs>


            <rect
                width="1000"
                height="550"
                fill="url(#g)"
            />


            <circle
                cx="800"
                cy="120"
                r="75"
                fill="rgba(255,255,255,.16)"
            />


            <path
                d="
                    M0 430
                    C180 350 300 470 460 395
                    C640 315 760 465 1000 350
                    L1000 550
                    L0 550 Z
                "
                fill="rgba(255,255,255,.16)"
            />


            <text
                x="55"
                y="475"
                fill="white"
                font-family="Arial"
                font-size="42"
                font-weight="700"
            >
                ${escapeHtml(label)}
            </text>

        </svg>
    `;


    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg)
    );

}


// ============================================================
// MODAL
// ============================================================

function setupModal() {

    const modal =
        document.querySelector(
            "#knowledge-modal"
        );


    const close =
        document.querySelector(
            "#knowledge-modal-close"
        );


    if (!modal) {
        return;
    }


    close?.addEventListener(
        "click",
        closeResourceModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeResourceModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeResourceModal();

            }

        }
    );

}


// ============================================================
// OPEN MODAL
// ============================================================

function openResourceModal(resource) {

    const modal =
        document.querySelector(
            "#knowledge-modal"
        );


    if (!modal) {
        return;
    }


    setText(
        "#modal-category",
        formatCategory(
            resource.category
        )
    );


    setText(
        "#modal-title",
        resource.title
    );


    setText(
        "#modal-description",
        resource.description
    );


    setText(
        "#modal-author",
        resource.author ||
        "Not specified"
    );


    setText(
        "#modal-category-detail",
        formatCategory(
            resource.category
        )
    );


    setText(
        "#modal-date",
        resource.published ||
        "Not specified"
    );


    modal.classList.add("show");


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


// ============================================================
// CLOSE MODAL
// ============================================================

function closeResourceModal() {

    const modal =
        document.querySelector(
            "#knowledge-modal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


// ============================================================
// CATEGORY NORMALIZATION
// ============================================================

function normalizeCategory(category) {

    const value =
        String(category || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");


    if (value === "all") {
        return "all";
    }


    if (
        value === "ice" ||
        value === "ice and glaciers"
    ) {

        return "ice & glaciers";

    }


    if (
        value === "oceans" ||
        value === "polar ocean"
    ) {

        return "polar oceans";

    }


    return value;

}


// ============================================================
// CATEGORY FORMAT
// ============================================================

function formatCategory(category) {

    const value =
        normalizeCategory(category);


    if (
        value === "ice & glaciers"
    ) {

        return "Ice & Glaciers";

    }


    if (
        value === "polar oceans"
    ) {

        return "Polar Oceans";

    }


    if (
        value === "climate"
    ) {

        return "Climate";

    }


    if (
        value === "wildlife"
    ) {

        return "Wildlife";

    }


    return value.replace(
        /\b\w/g,
        letter =>
            letter.toUpperCase()
    );

}


// ============================================================
// HELPERS
// ============================================================

function truncate(text, maxLength) {

    const value =
        String(text || "");


    if (
        value.length <= maxLength
    ) {

        return value;

    }


    return (
        value
            .substring(
                0,
                maxLength
            )
            .trim() +
        "..."
    );

}


function setText(selector, value) {

    const element =
        document.querySelector(
            selector
        );


    if (element) {

        element.textContent =
            value == null
                ? ""
                : String(value);

    }

}


function escapeHtml(value) {

    return String(
        value == null
            ? ""
            : value
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(value) {

    return escapeHtml(value);

}


console.log(
    "PolarConnect Knowledge page loaded successfully."
);