// ==========================================
// POLARCONNECT ADMIN - ADD KNOWLEDGE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const quickActions = document.querySelectorAll(".quick-action");

    if (!quickActions.length) {
        console.error("Quick actions not found.");
        return;
    }

    quickActions.forEach(action => {

        const actionText = action.textContent
            .trim()
            .toLowerCase();

        if (actionText.includes("add knowledge")) {

            action.addEventListener("click", (event) => {

                event.preventDefault();

                showKnowledgeForm();

            });

        }

    });

});


// ==========================================
// SHOW KNOWLEDGE FORM
// ==========================================

function showKnowledgeForm() {

    // Prevent duplicate forms
    if (document.getElementById("knowledge-admin-form")) {
        return;
    }

    const overlay = document.createElement("div");

    overlay.id = "knowledge-admin-form";

    overlay.innerHTML = `

        <div class="admin-form-overlay">

            <div class="admin-form-card">

                <div class="admin-form-header">

                    <div>

                        <span class="card-label">
                            CONTENT MANAGEMENT
                        </span>

                        <h2>
                            Add Knowledge
                        </h2>

                    </div>

                    <button
                        type="button"
                        class="admin-form-close"
                        id="close-knowledge-form"
                    >
                        ×
                    </button>

                </div>


                <form id="knowledge-form">


                    <!-- TITLE -->

                    <div class="admin-form-group">

                        <label for="knowledge-title">
                            Title
                        </label>

                        <input
                            type="text"
                            id="knowledge-title"
                            name="title"
                            placeholder="Enter resource title"
                            required
                        >

                    </div>


                    <!-- DESCRIPTION -->

                    <div class="admin-form-group">

                        <label for="knowledge-description">
                            Description
                        </label>

                        <textarea
                            id="knowledge-description"
                            name="description"
                            placeholder="Enter resource description"
                            rows="4"
                            required
                        ></textarea>

                    </div>


                    <!-- CATEGORY -->

                    <div class="admin-form-group">

                        <label for="knowledge-category">
                            Category
                        </label>

                        <input
                            type="text"
                            id="knowledge-category"
                            name="category"
                            placeholder="Example: Polar Science"
                            required
                        >

                    </div>


                    <!-- AUTHOR -->

                    <div class="admin-form-group">

                        <label for="knowledge-author">
                            Author
                        </label>

                        <input
                            type="text"
                            id="knowledge-author"
                            name="author"
                            placeholder="Enter author name"
                            required
                        >

                    </div>


                    <!-- DATE -->

                    <div class="admin-form-group">

                        <label for="knowledge-date">
                            Date
                        </label>

                        <input
                            type="date"
                            id="knowledge-date"
                            name="date"
                            required
                        >

                    </div>


                    <!-- FILE URL -->

                    <div class="admin-form-group">

                        <label for="knowledge-file">
                            File URL
                        </label>

                        <input
                            type="url"
                            id="knowledge-file"
                            name="file_url"
                            placeholder="https://example.com/resource.pdf"
                        >

                    </div>


                    <!-- IMAGE URL -->

                    <div class="admin-form-group">

                        <label for="knowledge-image">
                            Image URL
                        </label>

                        <input
                            type="url"
                            id="knowledge-image"
                            name="image_url"
                            placeholder="https://example.com/image.jpg"
                        >

                    </div>


                    <!-- BUTTONS -->

                    <div class="admin-form-actions">

                        <button
                            type="button"
                            class="admin-cancel-button"
                            id="cancel-knowledge-form"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            class="admin-submit-button"
                        >
                            Add Knowledge →
                        </button>

                    </div>


                </form>

            </div>

        </div>

    `;

    document.body.appendChild(overlay);


    // ==========================================
    // CLOSE BUTTON
    // ==========================================

    document
        .getElementById("close-knowledge-form")
        .addEventListener("click", closeKnowledgeForm);


    document
        .getElementById("cancel-knowledge-form")
        .addEventListener("click", closeKnowledgeForm);


    // ==========================================
    // FORM SUBMIT
    // ==========================================

    document
        .getElementById("knowledge-form")
        .addEventListener("submit", submitKnowledge);

}


// ==========================================
// SUBMIT KNOWLEDGE
// ==========================================

async function submitKnowledge(event) {

    event.preventDefault();

    const form = event.target;

    const submitButton =
        form.querySelector(".admin-submit-button");


    const data = {

        title:
            document.getElementById("knowledge-title")
                .value
                .trim(),

        description:
            document.getElementById("knowledge-description")
                .value
                .trim(),

        category:
            document.getElementById("knowledge-category")
                .value
                .trim(),

        author:
            document.getElementById("knowledge-author")
                .value
                .trim(),

        date:
            document.getElementById("knowledge-date")
                .value,

        file_url:
            document.getElementById("knowledge-file")
                .value
                .trim(),

        image_url:
            document.getElementById("knowledge-image")
                .value
                .trim()

    };


    submitButton.disabled = true;

    submitButton.textContent =
        "Adding...";


    try {

        const response = await fetch(
            `${API_BASE_URL}/knowledge/`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const result = await response.json();

        console.log(
            "Add Knowledge API response:",
            result
        );


        if (!response.ok) {

            let errorMessage =
                "Unable to add knowledge.";

            if (result.detail) {
                errorMessage = result.detail;
            }

            alert(errorMessage);

            return;
        }


        // ==========================================
        // SUCCESS
        // ==========================================

        alert(
            "Knowledge resource added successfully!"
        );


        closeKnowledgeForm();


        // Reload dashboard counts

        if (
            typeof loadAdminDashboard ===
            "function"
        ) {

            loadAdminDashboard();

        }


    } catch (error) {

        console.error(
            "Add Knowledge error:",
            error
        );

        alert(
            "Unable to connect to the Knowledge API."
        );

    } finally {

        submitButton.disabled = false;

        submitButton.textContent =
            "Add Knowledge →";

    }

}


// ==========================================
// CLOSE FORM
// ==========================================

function closeKnowledgeForm() {

    const form =
        document.getElementById(
            "knowledge-admin-form"
        );

    if (form) {
        form.remove();
    }

}