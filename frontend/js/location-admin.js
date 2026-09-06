document.addEventListener("DOMContentLoaded", () => {

    const quickActions = document.querySelectorAll(".quick-action");

    quickActions.forEach(action => {

        action.addEventListener("click", (event) => {

            const actionText =
                action.textContent.trim().toLowerCase();

            if (actionText.includes("add location")) {

                // Stop the <a href="#"> from navigating
                event.preventDefault();
                event.stopPropagation();

                openLocationForm();
            }

        });

    });

});


function openLocationForm() {

    // Prevent duplicate modal
    if (document.getElementById("location-admin-form")) {
        return;
    }

    const overlay = document.createElement("div");

    overlay.className = "admin-form-overlay";
    overlay.id = "location-admin-form";

    overlay.innerHTML = `

        <div class="admin-form-card">

            <!-- HEADER -->
            <div class="admin-form-header">

                <div>
                    <p>ADMIN PANEL</p>
                    <h2>Add Location</h2>
                </div>

                <button
                    type="button"
                    class="admin-form-close"
                    id="location-close"
                >
                    ×
                </button>

            </div>


            <!-- FORM -->
            <form id="location-form">

                <!-- LOCATION NAME -->
                <div class="admin-form-group">

                    <label for="location-name">
                        Location Name
                    </label>

                    <input
                        type="text"
                        id="location-name"
                        placeholder="Enter location name"
                        required
                    >

                </div>


                <!-- LATITUDE -->
                <div class="admin-form-group">

                    <label for="location-latitude">
                        Latitude
                    </label>

                    <input
                        type="number"
                        id="location-latitude"
                        placeholder="-77.8419"
                        step="any"
                        min="-90"
                        max="90"
                        required
                    >

                </div>


                <!-- LONGITUDE -->
                <div class="admin-form-group">

                    <label for="location-longitude">
                        Longitude
                    </label>

                    <input
                        type="number"
                        id="location-longitude"
                        placeholder="166.6863"
                        step="any"
                        min="-180"
                        max="180"
                        required
                    >

                </div>


                <!-- DESCRIPTION -->
                <div class="admin-form-group">

                    <label for="location-description">
                        Description
                    </label>

                    <textarea
                        id="location-description"
                        rows="5"
                        placeholder="Enter location description"
                        required
                    ></textarea>

                </div>


                <!-- REGION -->
                <div class="admin-form-group">

                    <label for="location-region">
                        Region
                    </label>

                    <input
                        type="text"
                        id="location-region"
                        placeholder="Antarctica"
                        required
                    >

                </div>


                <!-- BUTTONS -->
                <div class="admin-form-actions">

                    <button
                        type="button"
                        class="admin-cancel-btn"
                        id="location-cancel"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="admin-submit-btn"
                    >
                        Add Location
                    </button>

                </div>

            </form>

        </div>

    `;


    document.body.appendChild(overlay);


    // Get form elements
    const form =
        document.getElementById("location-form");

    const closeButton =
        document.getElementById("location-close");

    const cancelButton =
        document.getElementById("location-cancel");


    // Close buttons
    closeButton.addEventListener(
        "click",
        closeLocationForm
    );

    cancelButton.addEventListener(
        "click",
        closeLocationForm
    );


    // Form submission
    form.addEventListener(
        "submit",
        submitLocation
    );

}


async function submitLocation(event) {

    event.preventDefault();


    const submitButton =
        document.querySelector(
            "#location-form .admin-submit-btn"
        );


    submitButton.disabled = true;
    submitButton.textContent = "Adding...";


    // Collect values
    const name =
        document.getElementById("location-name")
            .value.trim();

    const latitude =
        Number(
            document.getElementById("location-latitude")
                .value
        );

    const longitude =
        Number(
            document.getElementById("location-longitude")
                .value
        );

    const description =
        document.getElementById("location-description")
            .value.trim();

    const region =
        document.getElementById("location-region")
            .value.trim();


    // Data for Django API
    const locationData = {

        name: name,

        latitude: latitude,

        longitude: longitude,

        description: description,

        region: region

    };


    console.log(
        "Sending location data:",
        locationData
    );


    try {

        const response = await fetch(
            `${API_BASE_URL}/locations/`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(locationData)
            }
        );


        const result =
            await response.json();


        console.log(
            "Location API response:",
            result
        );


        // Backend validation error
        if (!response.ok) {

            console.error(
                "Location creation failed:",
                result
            );


            if (
                typeof result === "object" &&
                result !== null
            ) {

                const errorMessages =
                    Object.entries(result)
                        .map(([field, message]) => {

                            return `${field}: ${message}`;

                        })
                        .join("\n");


                alert(
                    "Failed to add location:\n\n" +
                    errorMessages
                );

            } else {

                alert(
                    "Failed to add location."
                );

            }

            return;
        }


        // Success
        console.log(
            "Location created successfully:",
            result
        );


        alert(
            "Location added successfully!"
        );


        // Close form
        closeLocationForm();


        // Refresh Admin Dashboard
        if (
            typeof loadAdminDashboard ===
            "function"
        ) {

            loadAdminDashboard();

        }


    } catch (error) {

        console.error(
            "Location API error:",
            error
        );


        alert(
            "Unable to connect to the location service.\n\n" +
            "Make sure Django is running."
        );


    } finally {

        submitButton.disabled = false;
        submitButton.textContent =
            "Add Location";

    }

}


function closeLocationForm() {

    const overlay =
        document.getElementById(
            "location-admin-form"
        );


    if (overlay) {

        overlay.remove();

    }

}