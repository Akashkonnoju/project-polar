document.addEventListener("DOMContentLoaded", () => {

    const quickActions = document.querySelectorAll(".quick-action");

    quickActions.forEach(action => {
        action.addEventListener("click", () => {

            const actionText = action.textContent.trim().toLowerCase();

            if (actionText.includes("add research")) {
                openResearchForm();
            }

        });
    });

});


function openResearchForm() {

    // Prevent duplicate modal
    if (document.getElementById("research-admin-form")) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.className = "admin-form-overlay";
    overlay.id = "research-admin-form";

    overlay.innerHTML = `
        <div class="admin-form-card">

            <div class="admin-form-header">
                <div>
                    <p>ADMIN PANEL</p>
                    <h2>Add Research</h2>
                </div>

                <button class="admin-form-close" type="button">
                    ×
                </button>
            </div>

            <form id="research-form">

                <div class="admin-form-group">
                    <label for="research-title">Title</label>
                    <input
                        type="text"
                        id="research-title"
                        placeholder="Enter research title"
                        required
                    >
                </div>

                <div class="admin-form-group">
                    <label for="research-authors">Authors</label>
                    <input
                        type="text"
                        id="research-authors"
                        placeholder="Enter author names"
                        required
                    >
                </div>

                <div class="admin-form-group">
                    <label for="research-abstract">Abstract</label>
                    <textarea
                        id="research-abstract"
                        rows="5"
                        placeholder="Enter research abstract"
                        required
                    ></textarea>
                </div>

                <div class="admin-form-group">
                    <label for="research-year">Year</label>
                    <input
                        type="number"
                        id="research-year"
                        placeholder="2026"
                        min="1900"
                        max="2100"
                        required
                    >
                </div>

                <div class="admin-form-group">
                    <label for="research-journal">Journal</label>
                    <input
                        type="text"
                        id="research-journal"
                        placeholder="Enter journal name"
                        required
                    >
                </div>

                <div class="admin-form-group">
                    <label for="research-pdf">PDF URL</label>
                    <input
                        type="url"
                        id="research-pdf"
                        placeholder="https://example.com/research.pdf"
                    >
                </div>

                <div class="admin-form-group">
                    <label for="research-external">External Link</label>
                    <input
                        type="url"
                        id="research-external"
                        placeholder="https://example.com"
                    >
                </div>

                <div class="admin-form-actions">

                    <button
                        type="button"
                        class="admin-cancel-btn"
                        id="research-cancel"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="admin-submit-btn"
                    >
                        Add Research
                    </button>

                </div>

            </form>

        </div>
    `;

    document.body.appendChild(overlay);

    const form = document.getElementById("research-form");
    const closeButton = document.querySelector(".admin-form-close");
    const cancelButton = document.getElementById("research-cancel");

    closeButton.addEventListener("click", closeResearchForm);
    cancelButton.addEventListener("click", closeResearchForm);

    form.addEventListener("submit", submitResearch);

}


async function submitResearch(event) {

    event.preventDefault();

    const submitButton = document.querySelector(
        "#research-form .admin-submit-btn"
    );

    submitButton.disabled = true;
    submitButton.textContent = "Adding...";

    const researchData = {
        title: document.getElementById("research-title").value.trim(),
        authors: document.getElementById("research-authors").value.trim(),
        abstract: document.getElementById("research-abstract").value.trim(),
        year: Number(document.getElementById("research-year").value),
        journal: document.getElementById("research-journal").value.trim(),
        pdf_url: document.getElementById("research-pdf").value.trim(),
        external_link: document.getElementById("research-external").value.trim()
    };

    try {

        const response = await fetch(
            `${API_BASE_URL}/research/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(researchData)
            }
        );

        const result = await response.json();

        console.log("Research API response:", result);

        if (!response.ok) {

            console.error("Research creation failed:", result);

            alert(
                result.detail ||
                "Failed to add research. Please check the entered data."
            );

            return;
        }

        alert("Research added successfully!");

        closeResearchForm();

        // Refresh dashboard statistics
        if (typeof loadAdminDashboard === "function") {
            loadAdminDashboard();
        }

    } catch (error) {

        console.error("Research API error:", error);

        alert(
            "Unable to connect to the research service. " +
            "Make sure Django is running."
        );

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Add Research";

    }

}


function closeResearchForm() {

    const form = document.getElementById("research-admin-form");

    if (form) {
        form.remove();
    }

}