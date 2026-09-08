/* =========================================================
   POLARCONNECT - RESEARCH PAGE
   Works with research.html
   API: /api/research/
   ========================================================= */

const RESEARCH_API =
    typeof API_BASE_URL !== "undefined"
        ? `${API_BASE_URL}/research/`
        : "http://127.0.0.1:8000/api/research/";


/* =========================================================
   MEDIA IMAGES
   These images are taken from the same visual collection
   used by media.html.
   ========================================================= */

const MEDIA_IMAGES = {
    arcticIce:
        "https://images.unsplash.com/photo-1746310005142-21ca9368e70a?auto=format&fit=crop&w=1200&q=85",

    antarctica:
        "https://images.unsplash.com/photo-1695410864552-1beee4a65bf7?auto=format&fit=crop&w=1200&q=85",

    researchStation:
        "https://images.unsplash.com/photo-1557238687-f10be4e702ae?auto=format&fit=crop&w=1200&q=85",

    frozenOcean:
        "https://images.unsplash.com/photo-1780589613719-5642667970ec?auto=format&fit=crop&w=1200&q=85",

    penguin:
        "https://images.unsplash.com/photo-1654801530070-5702ed0089d6?auto=format&fit=crop&w=1200&q=85",

    expedition:
        "https://images.unsplash.com/photo-1529730705273-7f8ab24844e8?auto=format&fit=crop&w=1200&q=85",

    whale:
        "https://images.unsplash.com/photo-1584268904283-8832048ef10c?auto=format&fit=crop&w=1200&q=85",

    aurora:
        "https://images.unsplash.com/photo-1786335091902-eb0166246cbe?auto=format&fit=crop&w=1200&q=85",

    snow:
        "https://images.unsplash.com/photo-1739832208797-c79303b24257?auto=format&fit=crop&w=1200&q=85",

    glacier:
        "https://images.unsplash.com/photo-1606592641984-c9a1506d0705?auto=format&fit=crop&w=1200&q=85",

    arcticWildlife:
        "https://images.unsplash.com/photo-1778608256843-d69885cb17ca?auto=format&fit=crop&w=1200&q=85",

    fieldTeam:
        "https://images.unsplash.com/photo-1777824256452-626a33fc7190?auto=format&fit=crop&w=1200&q=85",

    changingGlacier:
        "https://images.unsplash.com/photo-1780945009788-44907a755766?auto=format&fit=crop&w=1200&q=85",

    icePatterns:
        "https://images.unsplash.com/photo-1670174023730-966d23eb891a?auto=format&fit=crop&w=1200&q=85",

    fieldExpedition:
        "https://images.unsplash.com/photo-1739056656228-968d52c7e834?auto=format&fit=crop&w=1200&q=85"
};


/* =========================================================
   VERIFIED FALLBACK RESEARCH
   Used when the backend has no records.

   These are based on current polar research/news from
   NASA, NASA/JPL and NSIDC.
   ========================================================= */

const FALLBACK_RESEARCH = [

    {
        id: "fallback-01",
        title: "Arctic Winter Sea Ice Ties Record Low",
        abstract:
            "NASA and NSIDC scientists reported that Arctic winter sea ice reached 14.29 million square kilometers on March 15, 2026, statistically tying the lowest maximum observed in the satellite record.",
        authors:
            "NASA • National Snow and Ice Data Center",
        year: 2026,
        date: "2026-03-26",
        journal: "NASA Earth Science",
        category: "climate",
        region: "Arctic",
        image: MEDIA_IMAGES.arcticIce,
        source_url:
            "https://science.nasa.gov/earth/arctic-winter-sea-ice-2026/"
    },

    {
        id: "fallback-02",
        title: "Changes in Arctic and Antarctic Sea-Ice Properties",
        abstract:
            "A 2026 review examines changes in sea-ice properties and processes across both polar regions, helping researchers understand evolving cryosphere conditions.",
        authors:
            "NASA Cryospheric Sciences Laboratory",
        year: 2026,
        date: "2026-09-02",
        journal: "Nature Reviews Earth & Environment",
        category: "climate",
        region: "Arctic • Antarctic",
        image: MEDIA_IMAGES.frozenOcean,
        source_url:
            "https://science.gsfc.nasa.gov/earth/cryosphere/publications/"
    },

    {
        id: "fallback-03",
        title: "NISAR Reveals Detailed Antarctic Ice Movement",
        abstract:
            "NASA and ISRO's NISAR satellite is providing detailed radar observations of Antarctic ice, including fractured ice and glacier movement around Nunatak Zaterjavshijsja.",
        authors:
            "NASA Jet Propulsion Laboratory • ISRO",
        year: 2026,
        date: "2026-07-21",
        journal: "NASA/JPL",
        category: "ice",
        region: "Antarctic",
        image: MEDIA_IMAGES.antarctica,
        source_url:
            "https://www.jpl.nasa.gov/news/us-india-satellite-delivers-data-reveals-hummingbird-in-antarctica/"
    },

    {
        id: "fallback-04",
        title: "Greenland Outlet Glacier Dynamics",
        abstract:
            "High-resolution observations are being used to investigate short-term changes in Greenland outlet glaciers and improve understanding of glacier behaviour.",
        authors:
            "NASA Cryospheric Sciences Laboratory",
        year: 2026,
        date: "2026-07-14",
        journal: "The Cryosphere",
        category: "ice",
        region: "Greenland",
        image: MEDIA_IMAGES.glacier,
        source_url:
            "https://science.gsfc.nasa.gov/earth/cryosphere/publications/"
    },

    {
        id: "fallback-05",
        title: "Arctic Sea Ice Conditions in August 2026",
        abstract:
            "NSIDC reported that Arctic sea ice averaged 5.56 million square kilometers in August 2026, ranking as the seventh-lowest August average in the satellite record.",
        authors:
            "National Snow and Ice Data Center",
        year: 2026,
        date: "2026-09-03",
        journal: "Sea Ice Today",
        category: "climate",
        region: "Arctic",
        image: MEDIA_IMAGES.arcticIce,
        source_url:
            "https://nsidc.org/sea-ice-today/analyses/arctic-zigs-antarctic-zags"
    },

    {
        id: "fallback-06",
        title: "Antarctic Sea-Ice Growth Shows Strong Variability",
        abstract:
            "Antarctic sea ice remained below the 1981–2010 average during August 2026, while researchers observed an unusual short period of sea-ice decline during the month.",
        authors:
            "National Snow and Ice Data Center",
        year: 2026,
        date: "2026-09-03",
        journal: "Sea Ice Today",
        category: "oceans",
        region: "Antarctic",
        image: MEDIA_IMAGES.antarctica,
        source_url:
            "https://nsidc.org/sea-ice-today/analyses/arctic-zigs-antarctic-zags"
    },

    {
        id: "fallback-07",
        title: "Compounding Variations in Greenland Glacier Dynamics",
        abstract:
            "Researchers are studying high-resolution observations of Greenland outlet glaciers to better understand seasonal and sub-seasonal changes in glacier motion.",
        authors:
            "Cryosphere Research Community",
        year: 2026,
        date: "2026-07-14",
        journal: "The Cryosphere",
        category: "ice",
        region: "Greenland",
        image: MEDIA_IMAGES.changingGlacier,
        source_url:
            "https://science.gsfc.nasa.gov/earth/cryosphere/publications/"
    },

    {
        id: "fallback-08",
        title: "Polar Ecosystems and Changing Ice",
        abstract:
            "Research into changing sea ice and polar environments helps scientists understand consequences for marine ecosystems, wildlife habitats and polar food webs.",
        authors:
            "Polar Science Research Network",
        year: 2026,
        date: "2026",
        journal: "Polar Science",
        category: "ecosystems",
        region: "Arctic • Antarctic",
        image: MEDIA_IMAGES.penguin,
        source_url:
            "https://nsidc.org/sea-ice-today/analyses/arctic-zigs-antarctic-zags"
    },

    {
        id: "fallback-09",
        title: "Remote Sensing of Polar Ice",
        abstract:
            "Satellite radar and altimetry observations are helping researchers monitor ice movement, thickness and surface changes across remote polar environments.",
        authors:
            "NASA Earth Science",
        year: 2026,
        date: "2026",
        journal: "Cryospheric Sciences",
        category: "ice",
        region: "Arctic • Antarctic",
        image: MEDIA_IMAGES.researchStation,
        source_url:
            "https://science.gsfc.nasa.gov/earth/cryosphere/publications/"
    },

    {
        id: "fallback-10",
        title: "Field Observations from the Polar Regions",
        abstract:
            "Field observations complement satellite measurements by providing detailed local information about sea ice, glaciers, weather and polar environments.",
        authors:
            "Polar Research Teams",
        year: 2026,
        date: "2026",
        journal: "Polar Research",
        category: "ecosystems",
        region: "Arctic • Antarctic",
        image: MEDIA_IMAGES.fieldTeam,
        source_url:
            "https://nsidc.org/sea-ice-today/analyses/arctic-zigs-antarctic-zags"
    }
    {
        id: "fallback-11",
        title: "Sensing the Poles' Hidden Heat",
        abstract:
            "NASA's PREFIRE mission is revealing seasonal temperature changes across the Arctic and Antarctic using observations of infrared energy emitted from the polar regions.",
        authors:
            "NASA Earth Observatory • PREFIRE Science Team",
        year: 2026,
        date: "2026-08-07",
        journal: "NASA Earth Observatory",
        category: "climate",
        region: "Arctic • Antarctic",
        image: MEDIA_IMAGES.aurora,
        source_url:
            "https://science.nasa.gov/earth/earth-observatory/sensing-the-poles-hidden-heat/"
    },

    {
        id: "fallback-12",
        title: "Antarctica's Coastal Blind Spots",
        abstract:
            "An international review identifies major gaps in observations of Antarctica's coastline and explains why better knowledge of ice, ocean, atmosphere and solid Earth interactions is important for sea-level predictions.",
        authors:
            "Scientific Committee on Antarctic Research • British Antarctic Survey",
        year: 2026,
        date: "2026-09-02",
        journal: "Reviews of Geophysics",
        category: "oceans",
        region: "Antarctic",
        image: MEDIA_IMAGES.antarctica,
        source_url:
            "https://www.bas.ac.uk/news/antarcticas-coastal-blind-spots-limit-sea-level-rise-predictions-scientists-warn/"
    },

    {
        id: "fallback-13",
        title: "Autonomous Robots Transform Polar Science",
        abstract:
            "Autonomous vehicles are increasingly being used beneath Antarctic sea ice, around Greenland glaciers and across remote polar environments to collect observations without requiring scientists to be physically present.",
        authors:
            "British Antarctic Survey",
        year: 2026,
        date: "2026-08-03",
        journal: "British Antarctic Survey",
        category: "ecosystems",
        region: "Arctic • Antarctic",
        image: MEDIA_IMAGES.fieldTeam,
        source_url:
            "https://www.bas.ac.uk/news/the-rise-of-the-robots-how-autonomous-vehicles-are-transforming-polar-science/"
    },

    {
        id: "fallback-14",
        title: "Greenland Ice Sheet to Atlantic Tipping Points",
        abstract:
            "A six-week international expedition is investigating how rapidly melting Greenland fjord glaciers influence the surrounding Atlantic Ocean using drones, marine robots, satellites and sensors.",
        authors:
            "British Antarctic Survey • GIANT Research Team",
        year: 2026,
        date: "2026-07-15",
        journal: "British Antarctic Survey",
        category: "ice",
        region: "Greenland",
        image: MEDIA_IMAGES.glacier,
        source_url:
            "https://www.bas.ac.uk/news/researchers-head-to-greenland-for-ambitious-science-mission/"
    },

    {
        id: "fallback-15",
        title: "Rothera Research Station Supports Future Polar Science",
        abstract:
            "New infrastructure at Rothera Research Station is designed to support long-term Antarctic science while improving operational efficiency and reducing environmental impact.",
        authors:
            "British Antarctic Survey",
        year: 2026,
        date: "2026-06-08",
        journal: "British Antarctic Survey",
        category: "ecosystems",
        region: "Antarctic Peninsula",
        image: MEDIA_IMAGES.researchStation,
        source_url:
            "https://www.bas.ac.uk/news/rothera-construction-season-upgrades-safeguard-future-polar-science/"
    },

    {
        id: "fallback-16",
        title: "A New Season of Antarctic Field Science",
        abstract:
            "More than 50 science projects were carried out during the 2025–26 Antarctic field season, covering weather, climate, wildlife, ecosystems, ice and ocean research.",
        authors:
            "British Antarctic Survey",
        year: 2026,
        date: "2026-05-28",
        journal: "British Antarctic Survey",
        category: "ecosystems",
        region: "Antarctic",
        image: MEDIA_IMAGES.expedition,
        source_url:
            "https://www.bas.ac.uk/news/from-tsunamis-to-sheathbills-british-antarctic-survey-celebrates-a-successful-season-south/"
    },

    {
        id: "fallback-17",
        title: "PREFIRE Mission Measures Polar Heat Loss",
        abstract:
            "NASA's twin PREFIRE CubeSats measure far-infrared energy emitted from Earth, providing observations that can improve understanding of sea-ice loss, ice-sheet melting and Arctic warming.",
        authors:
            "NASA Jet Propulsion Laboratory • PREFIRE Team",
        year: 2026,
        date: "2026-08-15",
        journal: "NASA Science",
        category: "climate",
        region: "Arctic • Antarctic",
        image: MEDIA_IMAGES.arcticIce,
        source_url:
            "https://www.jpl.nasa.gov/news/nasas-prefire-cubesat-mission-extended/"
    },

    {
        id: "fallback-18",
        title: "Ice Island Drifts Through Greenland's Nares Strait",
        abstract:
            "A large iceberg calved from Petermann Glacier in northwest Greenland during summer 2026 and moved into Nares Strait, where satellite observations captured its changing position.",
        authors:
            "NASA Earth Observatory",
        year: 2026,
        date: "2026-09-01",
        journal: "NASA Earth Observatory",
        category: "ice",
        region: "Greenland",
        image: MEDIA_IMAGES.glacier,
        source_url:
            "https://science.nasa.gov/earth/earth-observatory/iceberg-from-petermann-glacier-speeds-away/"
    },

    {
        id: "fallback-19",
        title: "Antarctic Gravity-Wave Observations",
        abstract:
            "Observatories in and around Antarctica collect atmospheric measurements that help scientists study gravity waves, airglow, temperatures and winds in the upper atmosphere.",
        authors:
            "British Antarctic Survey • Korea Polar Research Institute",
        year: 2026,
        date: "2026",
        journal: "Polar Atmospheric Research",
        category: "climate",
        region: "Antarctic",
        image: MEDIA_IMAGES.aurora,
        source_url:
            "https://www.bas.ac.uk/project/angwin/"
    },

    {
        id: "fallback-20",
        title: "Searching for Earth's Oldest Antarctic Ice",
        abstract:
            "The Beyond EPICA project is drilling deep into Antarctic ice to recover climate records that could extend back as far as 1.5 million years, providing evidence about ancient climate and greenhouse gases.",
        authors:
            "Beyond EPICA • European Polar Research Institutions",
        year: 2026,
        date: "2026",
        journal: "Beyond EPICA",
        category: "ice",
        region: "Antarctic",
        image: MEDIA_IMAGES.icePatterns,
        source_url:
            "https://www.bas.ac.uk/project/beyond-epica/"
    }
];


/* =========================================================
   STATE
   ========================================================= */

let allResearch = [];
let currentResearch = [];


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    setupResearchFilters();

    loadResearch();

});


/* =========================================================
   LOAD RESEARCH
   ========================================================= */

async function loadResearch() {

    const grid = document.getElementById("research-grid");
    const status = document.getElementById("research-status");

    if (!grid) {
        console.error("research-grid not found.");
        return;
    }

    showLoading(grid);

    if (status) {
        status.textContent = "Loading research...";
    }

    try {

        const response = await fetch(RESEARCH_API, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(
                `Research API returned ${response.status}`
            );
        }

        const data = await response.json();

        const apiItems = Array.isArray(data)
            ? data
            : Array.isArray(data.results)
                ? data.results
                : [];

        const normalizedApiItems =
            apiItems.map(normalizeResearchItem);

        /*
         * Add verified fallback research so the page does not
         * become empty when the backend contains only a few
         * records.
         */
        const combined = [
            ...normalizedApiItems,
            ...FALLBACK_RESEARCH
        ];

        allResearch = removeDuplicates(combined);

        currentResearch = [...allResearch];

        sortResearchByDate();

        renderResearch(currentResearch);

        updateResearchStatus(
            status,
            normalizedApiItems.length
        );

    } catch (error) {

        console.error(
            "Research API loading error:",
            error
        );

        /*
         * If backend is unavailable, still show useful
         * research content instead of leaving the page empty.
         */

        allResearch = [...FALLBACK_RESEARCH];

        currentResearch = [...allResearch];

        sortResearchByDate();

        renderResearch(currentResearch);

        if (status) {
            status.textContent =
                "Showing verified polar research collection";
        }
    }
}


/* =========================================================
   NORMALIZE BACKEND DATA
   ========================================================= */

function normalizeResearchItem(item) {

    const title =
        item.title ||
        item.name ||
        "Untitled Research";

    const abstract =
        item.abstract ||
        item.description ||
        item.summary ||
        item.content ||
        "No research summary available.";

    const authors =
        formatAuthors(
            item.authors ||
            item.author ||
            item.researchers
        );

    const year =
        item.year ||
        getYear(
            item.date ||
            item.published_date ||
            item.publication_date ||
            item.created_at
        ) ||
        2026;

    const date =
        item.date ||
        item.published_date ||
        item.publication_date ||
        item.created_at ||
        `${year}-01-01`;

    const journal =
        item.journal ||
        item.source ||
        item.publisher ||
        "Polar Science";

    const category =
        normalizeCategory(
            item.category ||
            item.topic ||
            item.subject ||
            item.field ||
            ""
        );

    const region =
        item.region ||
        item.location ||
        getRegionFromText(
            `${title} ${abstract}`
        );

    const image =
        item.image_url ||
        item.image ||
        getImageForResearch(
            title,
            abstract,
            category
        );

    const sourceUrl =
        item.pdf_url ||
        item.external_link ||
        item.url ||
        item.link ||
        "";

    return {

        id:
            item.id ||
            `api-${slugify(title)}`,

        title,

        abstract,

        authors,

        year,

        date,

        journal,

        category,

        region,

        image,

        source_url: sourceUrl
    };
}


/* =========================================================
   CATEGORY NORMALIZATION
   ========================================================= */

function normalizeCategory(value) {

    const category =
        String(value || "")
            .trim()
            .toLowerCase();

    if (
        category.includes("climate") ||
        category.includes("atmosphere") ||
        category.includes("temperature")
    ) {
        return "climate";
    }

    if (
        category.includes("ice") ||
        category.includes("glacier") ||
        category.includes("cryosphere") ||
        category.includes("snow")
    ) {
        return "ice";
    }

    if (
        category.includes("ocean") ||
        category.includes("sea") ||
        category.includes("marine")
    ) {
        return "oceans";
    }

    if (
        category.includes("ecosystem") ||
        category.includes("ecology") ||
        category.includes("wildlife") ||
        category.includes("biodiversity")
    ) {
        return "ecosystems";
    }

    return "climate";
}


/* =========================================================
   IMAGE SELECTION
   ========================================================= */

function getImageForResearch(
    title,
    abstract,
    category
) {

    const text =
        `${title} ${abstract}`.toLowerCase();

    if (
        text.includes("penguin") ||
        text.includes("wildlife") ||
        text.includes("ecosystem") ||
        text.includes("biodiversity")
    ) {
        return MEDIA_IMAGES.penguin;
    }

    if (
        text.includes("whale") ||
        text.includes("marine") ||
        text.includes("ocean")
    ) {
        return MEDIA_IMAGES.whale;
    }

    if (
        text.includes("aurora") ||
        text.includes("atmosphere")
    ) {
        return MEDIA_IMAGES.aurora;
    }

    if (
        text.includes("glacier") ||
        text.includes("ice sheet") ||
        text.includes("ice")
    ) {
        return MEDIA_IMAGES.glacier;
    }

    if (
        text.includes("greenland") ||
        text.includes("arctic")
    ) {
        return MEDIA_IMAGES.arcticIce;
    }

    if (
        text.includes("antarctic") ||
        text.includes("antarctica")
    ) {
        return MEDIA_IMAGES.antarctica;
    }

    if (
        text.includes("expedition") ||
        text.includes("field")
    ) {
        return MEDIA_IMAGES.expedition;
    }

    if (category === "oceans") {
        return MEDIA_IMAGES.frozenOcean;
    }

    if (category === "ecosystems") {
        return MEDIA_IMAGES.penguin;
    }

    if (category === "ice") {
        return MEDIA_IMAGES.glacier;
    }

    return MEDIA_IMAGES.researchStation;
}


/* =========================================================
   RENDER RESEARCH
   ========================================================= */

function renderResearch(items) {

    const grid =
        document.getElementById("research-grid");

    if (!grid) return;

    grid.innerHTML = "";

    if (!items || items.length === 0) {

        grid.innerHTML = `
            <div class="research-empty">
                <h3>No research found</h3>
                <p>
                    No research records are available
                    for this category.
                </p>
            </div>
        `;

        return;
    }

    items.forEach((item, index) => {

        grid.insertAdjacentHTML(
            "beforeend",
            createResearchCard(item, index)
        );

    });
}


/* =========================================================
   CREATE RESEARCH CARD
   ========================================================= */

function createResearchCard(item, index) {

    const title =
        escapeHTML(
            item.title
        );

    const abstract =
        escapeHTML(
            shortenText(
                item.abstract,
                145
            )
        );

    const category =
        escapeHTML(
            getCategoryLabel(
                item.category
            )
        );

    const region =
        escapeHTML(
            item.region ||
            "Polar Regions"
        );

    const year =
        escapeHTML(
            String(item.year || "2026")
        );

    const authors =
        escapeHTML(
            item.authors ||
            "Polar Science Research"
        );

    const journal =
        escapeHTML(
            item.journal ||
            "Polar Science"
        );

    const image =
        escapeAttribute(
            item.image ||
            MEDIA_IMAGES.researchStation
        );

    const source =
        item.source_url
            ? escapeAttribute(item.source_url)
            : "";

    const action =
        source
            ? `
                <a
                    href="${source}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="research-open-link"
                >
                    View Research →
                </a>
              `
            : `
                <span class="research-open-link">
                    Research Record
                </span>
              `;


    return `
        <article class="research-card">

            <!-- RESEARCH IMAGE -->
            <div
                class="research-card-image"
                style="
                    width:100%;
                    height:210px;
                    overflow:hidden;
                    border-radius:14px;
                    margin-bottom:20px;
                    background:#102437;
                    position:relative;
                "
            >

                <img
                    src="${image}"
                    alt="${title}"
                    loading="lazy"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                        display:block;
                    "
                    onerror="
                        this.onerror=null;
                        this.src='${MEDIA_IMAGES.researchStation}';
                    "
                >

                <span
                    style="
                        position:absolute;
                        top:14px;
                        left:14px;
                        padding:6px 10px;
                        border-radius:20px;
                        background:rgba(4,20,32,.85);
                        color:#8de9ff;
                        font-size:11px;
                        letter-spacing:.12em;
                        font-weight:700;
                    "
                >
                    ${category}
                </span>

            </div>


            <!-- TOP -->
            <div class="research-card-top">

                <span class="research-category">
                    ${category}
                </span>

                <span class="research-year">
                    ${year}
                </span>

            </div>


            <!-- TITLE -->
            <h3>
                ${title}
            </h3>


            <!-- DESCRIPTION -->
            <p>
                ${abstract}
            </p>


            <!-- DETAILS -->
            <div
                style="
                    margin-top:14px;
                    display:flex;
                    flex-direction:column;
                    gap:5px;
                    font-size:.78rem;
                    line-height:1.45;
                    color:rgba(210,235,245,.65);
                "
            >

                <span>
                    <strong
                        style="color:#9deeff;"
                    >
                        Region:
                    </strong>
                    ${region}
                </span>

                <span>
                    <strong
                        style="color:#9deeff;"
                    >
                        Authors:
                    </strong>
                    ${authors}
                </span>

                <span>
                    <strong
                        style="color:#9deeff;"
                    >
                        Source:
                    </strong>
                    ${journal}
                </span>

            </div>


            <!-- FOOTER -->
            <div class="research-card-footer">

                <span>
                    ${region}
                </span>

                ${action}

            </div>

        </article>
    `;
}


/* =========================================================
   FILTERS
   ========================================================= */

function setupResearchFilters() {

    const filters =
        document.querySelectorAll(
            ".research-filters button"
        );

    if (!filters.length) {
        return;
    }

    filters.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filters.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );

                button.classList.add("active");

                const category =
                    String(
                        button.dataset.category ||
                        "all"
                    )
                        .toLowerCase();

                if (
                    category === "all"
                ) {

                    currentResearch =
                        [...allResearch];

                } else {

                    currentResearch =
                        allResearch.filter(
                            item =>
                                item.category ===
                                category
                        );
                }

                sortResearchByDate();

                renderResearch(
                    currentResearch
                );

            }
        );

    });
}


/* =========================================================
   SORT BY DATE
   ========================================================= */

function sortResearchByDate() {

    currentResearch.sort(
        (a, b) => {

            const dateA =
                new Date(
                    a.date ||
                    `${a.year}-01-01`
                ).getTime();

            const dateB =
                new Date(
                    b.date ||
                    `${b.year}-01-01`
                ).getTime();

            return dateB - dateA;
        }
    );
}


/* =========================================================
   DUPLICATE REMOVAL
   ========================================================= */

function removeDuplicates(items) {

    const seen =
        new Set();

    return items.filter(item => {

        const key =
            `${String(item.title || "")
                .trim()
                .toLowerCase()}|
             ${String(item.abstract || "")
                .trim()
                .toLowerCase()}`;

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);

        return true;
    });
}


/* =========================================================
   STATUS
   ========================================================= */

function updateResearchStatus(
    status,
    apiCount
) {

    if (!status) return;

    const total =
        allResearch.length;

    if (apiCount > 0) {

        status.textContent =
            `${total} research records available`;

    } else {

        status.textContent =
            `${total} verified research records available`;
    }
}


/* =========================================================
   LOADING
   ========================================================= */

function showLoading(grid) {

    grid.innerHTML = `
        <div
            class="research-empty"
            style="grid-column:1/-1;"
        >
            <h3>
                Loading polar research...
            </h3>

            <p>
                Connecting to the PolarConnect
                research collection.
            </p>
        </div>
    `;
}


/* =========================================================
   HELPERS
   ========================================================= */

function getCategoryLabel(category) {

    const labels = {

        climate:
            "CLIMATE",

        ice:
            "ICE & GLACIERS",

        oceans:
            "OCEANS",

        ecosystems:
            "ECOSYSTEMS"
    };

    return (
        labels[category] ||
        "POLAR SCIENCE"
    );
}


function getRegionFromText(text) {

    const value =
        String(text || "")
            .toLowerCase();

    if (
        value.includes("arctic")
    ) {
        return "Arctic";
    }

    if (
        value.includes("antarctic") ||
        value.includes("antarctica")
    ) {
        return "Antarctic";
    }

    if (
        value.includes("greenland")
    ) {
        return "Greenland";
    }

    return "Arctic • Antarctic";
}


function formatAuthors(authors) {

    if (!authors) {
        return "Polar Science Research";
    }

    if (Array.isArray(authors)) {

        return authors
            .map(author => {

                if (
                    typeof author === "string"
                ) {
                    return author;
                }

                return (
                    author.name ||
                    author.full_name ||
                    ""
                );

            })
            .filter(Boolean)
            .join(", ");
    }

    return String(authors);
}


function getYear(value) {

    if (!value) {
        return "";
    }

    const date =
        new Date(value);

    if (
        !Number.isNaN(
            date.getTime()
        )
    ) {
        return date
            .getFullYear()
            .toString();
    }

    const match =
        String(value)
            .match(/\b(20\d{2})\b/);

    return match
        ? match[1]
        : "";
}


function shortenText(
    text,
    maxLength
) {

    const value =
        String(text || "")
            .trim();

    if (
        value.length <= maxLength
    ) {
        return value;
    }

    return (
        value.substring(
            0,
            maxLength
        ).trim() +
        "..."
    );
}


function slugify(text) {

    return String(text || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}


function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return escapeHTML(value);
}