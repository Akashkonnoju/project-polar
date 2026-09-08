document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("forgot-password-form");
    const usernameInput = document.getElementById("recovery-username");
    const newPasswordInput = document.getElementById("new-password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const button = document.getElementById("forgot-button");
    const message = document.getElementById("forgot-message");


    if (!form) {
        console.error("Forgot password form not found.");
        return;
    }


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        const username = usernameInput.value.trim();
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;


        // -----------------------------------------
        // FRONTEND VALIDATION
        // -----------------------------------------

        if (!username) {
            showMessage(
                "Please enter your username.",
                "error"
            );
            usernameInput.focus();
            return;
        }


        if (!newPassword) {
            showMessage(
                "Please enter your new password.",
                "error"
            );
            newPasswordInput.focus();
            return;
        }


        if (newPassword.length < 6) {
            showMessage(
                "Password must contain at least 6 characters.",
                "error"
            );
            newPasswordInput.focus();
            return;
        }


        if (newPassword !== confirmPassword) {
            showMessage(
                "New password and confirm password do not match.",
                "error"
            );
            confirmPasswordInput.focus();
            return;
        }


        // -----------------------------------------
        // BUTTON
        // -----------------------------------------

        button.disabled = true;
        button.textContent = "Resetting...";

        message.style.display = "none";


        try {

            // -----------------------------------------
            // BACKEND API
            // -----------------------------------------

            const response = await fetch(
                `${API_BASE_URL}/forgot-password/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        new_password: newPassword
                    })
                }
            );


            // -----------------------------------------
            // READ RESPONSE
            // -----------------------------------------

            const responseText = await response.text();

            console.log(
                "Forgot Password Status:",
                response.status
            );

            console.log(
                "Forgot Password Response:",
                responseText
            );


            let data = {};

            try {
                data = JSON.parse(responseText);
            } catch {
                data = {};
            }


            // -----------------------------------------
            // SUCCESS
            // -----------------------------------------

            if (response.ok) {

                showMessage(
                    data.message ||
                    "Password reset successfully.",
                    "success"
                );


                form.reset();


                setTimeout(() => {

                    window.location.href = "login.html";

                }, 2000);


                return;
            }


            // -----------------------------------------
            // BACKEND ERROR
            // -----------------------------------------

            let errorMessage =
                "Unable to reset password.";


            if (data.detail) {

                errorMessage = data.detail;

            }
            else if (data.error) {

                errorMessage = data.error;

            }
            else if (data.message) {

                errorMessage = data.message;

            }
            else if (data.username) {

                errorMessage = Array.isArray(data.username)
                    ? data.username.join(" ")
                    : data.username;

            }
            else if (data.new_password) {

                errorMessage = Array.isArray(data.new_password)
                    ? data.new_password.join(" ")
                    : data.new_password;

            }
            else if (responseText) {

                errorMessage = responseText;

            }


            showMessage(
                errorMessage,
                "error"
            );


        }
        catch (error) {

            console.error(
                "Forgot Password Error:",
                error
            );


            showMessage(
                "Cannot connect to the backend. Please make sure Django is running.",
                "error"
            );

        }
        finally {

            button.disabled = false;
            button.textContent = "Reset Password";

        }

    });



    // -----------------------------------------
    // MESSAGE FUNCTION
    // -----------------------------------------

    function showMessage(text, type) {

        message.textContent = text;

        message.className =
            `forgot-message ${type}`;

        message.style.display = "block";

    }

});