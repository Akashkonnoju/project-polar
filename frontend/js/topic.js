document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("topic-grid");
    const status = document.getElementById("topic-status");
    const topic = window.POLAR_TOPIC;

    if (!grid || !topic) {
        console.error("Topic elements not found.");
        return;
    }

    try {
        const response = await getTopics(topic);

        const items = Array.isArray(response)
            ? response
            : (response.results || []);

        if (!items.length) {
            status.textContent = "No verified information found.";
            return;
        }

        status.textContent =
            `${items.length} verified portal record${items.length > 1 ? "s" : ""} found.`;

        grid.innerHTML = items.map(item => `
            <article class="feature-card">
                <h3>${escapeHTML(item.title || "Untitled")}</h3>

                <p>
                    ${escapeHTML(item.summary || item.content || "No description available.")}
                </p>

                ${
                    item.source_url
                    ? `<a href="${item.source_url}" target="_blank" rel="noopener">
                        View Official Source →
                       </a>`
                    : ""
                }
            </article>
        `).join("");

    } catch (error) {
        console.error("Climate API error:", error);
        status.textContent =
            "Unable to load information from the portal.";
    }
});


function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}