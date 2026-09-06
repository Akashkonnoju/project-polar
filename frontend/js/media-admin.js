\document.addEventListener("DOMContentLoaded", () => {

    const quickActions = document.querySelectorAll(".quick-action");

    quickActions.forEach(action => {

        action.addEventListener("click", () => {

            const actionText =
                action.textContent.trim().toLowerCase();

            if (actionText.includes("add media")) {
                openMediaForm();
            }

        });

    });

});


function openMediaForm() {

    // Prevent duplicate form
    if (document.getElementById("media-admin-form")) {
        return;
    }

    const overlay = document.createElement("div");

    overlay.className = "admin-form-overlay";
    overlay.id = "media-admin-form";

    overlay.innerHTML = `

        <div class="admin-form-card">

            <!-- HEADER -->
            <div class="admin-form-header">

                <div>
                    <p>ADMIN PANEL</p>
                    <h2>Add Media</h2>
                </div>

                <button
                    type="button"
                    class="admin-form-close"
                    id="media-close"
                >
                    ×
                </button>

            </div>


            <!-- FORM -->
            <form id="media-form">

                <!-- TITLE -->
                <div class="admin-form-group">

                    <label for="media-title">
                        Title
                    </label>

                    <input
                        type="text"
                        id="media-title"
                        placeholder="Enter media title"
                        required
                    >

                </div>


                <!-- DESCRIPTION -->
                <div class="admin-form-group">

                    <label for="media-description">
                        Description
                    </label>

                    <textarea
                        id="media-description"
                        rows="5"
                        placeholder="Enter media description"
                        required
                    ></textarea>

                </div>


                <!-- MEDIA TYPE -->
                <div class="admin-form-group">

                    <label for="media-type">
                        Media Type
                    </label>

                    <select
                        id="media-type"
                        required
                    >

                        <option value="">
                            Select media type
                        </option>

                        <option value="video">
                            Video
                        </option>

                        <option value="image">
                            Image
                        </option>

                        <option value="audio">
                            Audio
                        </option>

                        <option value="document">
                            Document
                        </option>

                    </select>

                </div>


                <!-- THUMBNAIL -->
                <div class="admin-form-group">

                    <label for="media-thumbnail">
                        Thumbnail URL
                    </label>

                    <input
                        type="url"
                        id="media-thumbnail"
                        placeholder="https://example.com/image.jpg"
                    >

                </div>


                <!-- MEDIA URL -->
                <div class="admin-form-group">

                    <label for="media-url">
                        Media URL
                    </label>

                    <input
                        type="url"
                        id="media-url"
                        placeholder="https://example.com/media"
                        required
                    >

                </div>


                <!-- DATE -->
                <div class="admin-form-group">

                    <label for="media-date">
                        Date
                    </label>

                    <input
                        type="date"
                        id="media-date"
                        required
                    >

                </div>


                <!-- BUTTONS -->
                <div class="admin-form-actions">

                    <button
                        type="button"
                        class="admin-cancel-btn"
                        id="media-cancel"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="admin-submit-btn"
                    >
                        Add Media
                    </button>

                </div>

            </form>

        </div>

    `;


    document.body.appendChild(overlay);


    // Get elements
    const form =
        document.getElementById("media-form");

    const closeButton =
        document.getElementById("media-close");

    const cancelButton =
        document.getElementById("media-cancel");


    // Close buttons
    closeButton.addEventListener(
        "click",
        closeMediaForm
    );

    cancelButton.addEventListener(
        "click",
        closeMediaForm
    );


    // Submit form
    form.addEventListener(
        "submit",
        submitMedia
    );

}


async function submitMedia(event) {

    event.preventDefault();


    const submitButton =
        document.querySelector(
            "#media-form .admin-submit-btn"
        );


    submitButton.disabled = true;
    submitButton.textContent = "Adding...";


    // Collect form values
    const title =
        document.getElementById("media-title")
            .value.trim();

    const description =
        document.getElementById("media-description")
            .value.trim();

    const mediaType =
        document.getElementById("media-type")
            .value;

    const thumbnail =
        document.getElementById("media-thumbnail")
            .value.trim();

    const mediaUrl =
        document.getElementById("media-url")
            .value.trim();

    const date =
        document.getElementById("media-date")
            .value;


    // Data sent to Django
    const mediaData = {

        title: title,

        description: description,

        media_type: mediaType,

        thumbnail: thumbnail,

        media_url: mediaUrl,

        date: date

    };


    console.log(
        "Sending media data:",
        mediaData
    );


    try {

        const response = await fetch(
            `${API_BASE_URL}/media/`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(mediaData)
            }
        );


        const result =
            await response.json();


        console.log(
            "Media API response:",
            result
        );


        // If Django rejects the request
        if (!response.ok) {

            console.error(
                "Media creation failed:",
                result
            );


            // Show useful backend error
            if (typeof result === "object") {

                const errorMessages =
                    Object.entries(result)
                        .map(([field, message]) => {

                            return `${field}: ${message}`;

                        })
                        .join("\n");

                alert(
                    "Failed to add media:\n\n" +
                    errorMessages
                );

            } else {

                alert(
                    "Failed to add media."
                );

            }

            return;
        }


        // Success
        console.log(
            "Media created successfully:",
            result
        );


        alert(
            "Media added successfully!"
        );


        // Close form
        closeMediaForm();


        // Refresh admin statistics
        if (
            typeof loadAdminDashboard ===
            "function"
        ) {

            loadAdminDashboard();

        }


    } catch (error) {

        console.error(
            "Media API error:",
            error
        );


        alert(
            "Unable to connect to the media service.\n\n" +
            "Make sure Django is running."
        );


    } finally {

        submitButton.disabled = false;
        submitButton.textContent =
            "Add Media";

    }

}


function closeMediaForm() {

    const overlay =
        document.getElementById(
            "media-admin-form"
        );


    if (overlay) {

        overlay.remove();

    }

}