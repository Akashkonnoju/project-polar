document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("resource-search");
    const button = document.getElementById("resource-search-btn");
    const category = document.getElementById("category-filter");

    const grid = document.getElementById("resource-grid");
    const status = document.getElementById("resource-status");


    const esc = (v) =>
        String(v ?? "").replace(
            /[&<>"']/g,
            c => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[c])
        );


    function showResults(items) {

        if (!items.length) {
            status.textContent = "No resources found.";
            grid.innerHTML = "";
            return;
        }

        status.textContent =
            `${items.length} resource${items.length === 1 ? "" : "s"} found`;

        grid.innerHTML = items.map(x => `

            <article class="search-result">

                <span class="result-type">
                    ${esc(x.category || x.media_type || "RESOURCE")}
                </span>

                <h3>
                    ${esc(x.title)}
                </h3>

                <p>
                    ${esc(x.description || x.abstract || "")}
                </p>

                <div class="result-meta">
                    ${x.author ? `Author: ${esc(x.author)}` : ""}
                    ${x.authors ? `Authors: ${esc(x.authors)}` : ""}
                </div>

                <div class="result-meta">
                    ${x.date ? `Date: ${esc(x.date)}` : ""}
                    ${x.year ? `Year: ${esc(x.year)}` : ""}
                </div>

                ${
                    x.file_url
                    ? `
                        <a
                            class="result-link"
                            href="${esc(x.file_url)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Open Resource ↗
                        </a>
                    `
                    : x.pdf_url
                    ? `
                        <a
                            class="result-link"
                            href="${esc(x.pdf_url)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Open Research ↗
                        </a>
                    `
                    : ""
                }

            </article>

        `).join("");
    }
async function load() {

    status.textContent = "Loading resources...";
    grid.innerHTML = "";

    try {

        const data = await getResources({
            category: category.value
        });

        let items = Array.isArray(data)
            ? data
            : (data.results || []);

        const q = input.value.trim().toLowerCase();

        if (q) {
            items = items.filter(x =>
                `${x.title || ""} ${x.description || ""} ${x.category || ""} ${x.author || ""}`
                    .toLowerCase()
                    .includes(q)
            );
        }

        if (!items.length) {
            status.textContent = "No resources found.";
            return;
        }

        status.textContent =
            `${items.length} resource${items.length === 1 ? "" : "s"} found`;

        grid.innerHTML = items.map(x => `

            <article class="search-result">

                <span class="result-type">
                    ${esc(x.category || "RESOURCE")}
                </span>

                <h3>${esc(x.title)}</h3>

                <p>${esc(x.description)}</p>

                <div class="result-meta">
                    Author: ${esc(x.author)}
                </div>

                <div class="result-meta">
                    Date: ${esc(x.date)}
                </div>

                ${
                    x.file_url
                    ? `
                    <a
                        class="result-link"
                        href="${esc(x.file_url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open Resource ↗
                    </a>
                    `
                    : ""
                }

            </article>

        `).join("");

    } catch (e) {

        console.error(e);

        status.textContent =
            "Unable to load resources. Make sure Django is running.";
    }
}
    // Category dropdown
    category.addEventListener("change", load);


    // Search button
    button.addEventListener("click", load);


    // Press Enter to search
    input.addEventListener("keydown", e => {

        if (e.key === "Enter") {
            load();
        }

    });


    // Initial load
    load();

});