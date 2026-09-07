// ==========================================
// POLAR SCIENCE PORTAL - REGISTER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const registerForm =
        document.getElementById("register-form");

    if (!registerForm) {
        console.error("Register form not found.");
        return;
    }


    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // ==========================================
            // GET FORM VALUES
            // ==========================================

            const username =
                document.getElementById("username")
                    .value
                    .trim();

            const email =
                document.getElementById("email")
                    .value
                    .trim();

            const password =
                document.getElementById("register-password")
                    .value;

            const confirmPassword =
                document.getElementById("confirm-password")
                    .value;

            const registerButton =
                document.getElementById("register-button");


            // ==========================================
            // VALIDATION
            // ==========================================

            if (!username || !email || !password) {

                alert(
                    "Please fill in all required fields."
                );

                return;
            }


            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match."
                );

                return;
            }


            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            // ==========================================
            // DISABLE BUTTON
            // ==========================================

            registerButton.disabled = true;

            registerButton
                .querySelector("span")
                .textContent = "Creating...";


            try {

                // ==========================================
                // CALL DJANGO REGISTER API
                // ==========================================

                const result = await registerUser({

                    username: username,

                    email: email,

                    password: password

                });


                console.log(
                    "Register API response:",
                    result
                );


                // ==========================================
                // SUCCESS
                // ==========================================

                if (
                    result.message ===
                    "User registered successfully"
                ) {

                    alert(
                        "Account created successfully! Please login."
                    );


                    window.location.href =
                        "login.html";

                    return;
                }


                // ==========================================
                // REGISTRATION ERROR
                // ==========================================

                let errorMessage =
                    "Registration failed.";


                if (result.username) {

                    errorMessage =
                        result.username.join(" ");

                } else if (result.email) {

                    errorMessage =
                        result.email.join(" ");

                } else if (result.password) {

                    errorMessage =
                        result.password.join(" ");

                } else if (result.detail) {

                    errorMessage =
                        result.detail;

                }


                alert(errorMessage);


            } catch (error) {

                console.error(
                    "Register API error:",
                    error
                );


                alert(
                    "Unable to connect to the registration service."
                );

            } finally {

                registerButton.disabled = false;

                registerButton
                    .querySelector("span")
                    .textContent =
                    "Create Account";

            }

        }
    );

});