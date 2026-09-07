// ==========================================
// POLARCONNECT - GLOBAL SEARCH (EXTENDED)
// Searches existing + new portal modules.
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("global-search");
    const button = document.getElementById("search-btn");
    const results = document.getElementById("search-results");
    if (!input || !button || !results) return;

    const esc = v => String(v ?? "").replace(/[&<>"']/g, c =>
        ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

    const list = (title, items, type, linkFn) => {
        if (!items.length) return "";
        return `<section class="search-category">
            <div class="category-heading"><span class="category-line"></span><h4>${title}</h4></div>
            <div class="search-results-grid">
            ${items.map(x => `<article class="search-result">
                <span class="result-type">${esc(type)}</span>
                <h3>${esc(x.title || x.name || "Untitled")}</h3>
                <p>${esc(x.description || x.summary || x.abstract || x.content || "No description available.")}</p>
                <div class="result-meta">${x.category ? "Category: "+esc(x.category) : ""}${x.region ? " · Region: "+esc(x.region) : ""}</div>
                ${linkFn(x)}
            </article>`).join("")}
            </div>
        </section>`;
    };

    async function performSearch() {
        const q = input.value.trim();
        if (!q) {
            results.innerHTML = `<div class="search-no-results"><h3>Start your search</h3><p>Try climate, glacier, sea ice, Arctic, Antarctic, ocean or biodiversity.</p></div>`;
            return;
        }
        results.innerHTML = `<div class="search-loading">Searching the polar repository...</div>`;
        try {
            const r = await searchContent(q);
            const groups = [
                ["Knowledge", r.knowledge || [], "KNOWLEDGE", x => x.file_url || x.external_link || x.url ? `<a class="result-link" target="_blank" rel="noopener noreferrer" href="${esc(x.file_url || x.external_link || x.url)}">View Resource →</a>` : ""],
                ["Research", r.research || [], "RESEARCH", x => x.pdf_url || x.external_link ? `<a class="result-link" target="_blank" rel="noopener noreferrer" href="${esc(x.pdf_url || x.external_link)}">View Research →</a>` : ""],
                ["Media", r.media || [], "MEDIA", x => x.media_url ? `<a class="result-link" target="_blank" rel="noopener noreferrer" href="${esc(x.media_url)}">View Media →</a>` : ""],
                ["Locations", r.locations || [], "LOCATION", x => `<a class="result-link" href="map.html">View on Map →</a>`],
                ["Polar Topics", r.topics || [], "TOPIC", x => x.source_url ? `<a class="result-link" target="_blank" rel="noopener noreferrer" href="${esc(x.source_url)}">Open Source ↗</a>` : ""],
                ["Datasets", r.datasets || [], "DATASET", x => `<a class="result-link" href="resources.html">View Dataset →</a>`],
                ["Resources", r.resources || [], "RESOURCE", x => x.external_url || x.source_url ? `<a class="result-link" target="_blank" rel="noopener noreferrer" href="${esc(x.external_url || x.source_url)}">Open Resource ↗</a>` : ""]
            ];
            const total = groups.reduce((n,g)=>n+g[1].length,0);
            if (!total) {
                results.innerHTML = `<div class="search-no-results"><h3>No results found</h3><p>No portal information matched <strong>${esc(q)}</strong>.</p><span>Try climate, ice, glacier, ocean, Arctic, Antarctic or biodiversity.</span></div>`;
                return;
            }
            results.innerHTML = `<div class="search-result-heading"><span class="heading-small">SEARCH RESULTS</span><h3>Results for <span>"${esc(q)}"</span></h3><p class="result-count">${total} result${total===1?"":"s"} found</p></div>` +
                groups.map(g=>list(g[0],g[1],g[2],g[3])).join("");
        } catch (e) {
            console.error(e);
            results.innerHTML = `<div class="search-error"><h3>Search unavailable</h3><p>Unable to connect to the Django search service.</p></div>`;
        }
    }

    button.addEventListener("click", performSearch);
    input.addEventListener("keydown", e => { if (e.key === "Enter") performSearch(); });
    const q = new URLSearchParams(location.search).get("q");
    if (q) { input.value = q; performSearch(); }
});
